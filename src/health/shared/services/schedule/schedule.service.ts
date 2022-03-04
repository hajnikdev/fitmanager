import { Injectable, Query } from '@angular/core';

import { Store } from 'store';

import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

// Models
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

// Services
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

export interface ScheduleItem {
  meals: Meal[] | null;
  workouts: Workout[] | null;
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const id = section.data.$key;
      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items,
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  selected$ = this.section$.pipe(
    tap((next: any) => this.store.set('selected', next))
  );

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  );

  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap((next: any) => this.store.set('date', next)),
    map((day: any) => {
      const startAt = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      ).getTime();
      const endAt =
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate() + 1
        ).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }: any) => {
      return this.getSchedule(startAt, endAt);
    }),
    map((data: any) => {
      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap((next: any) => this.store.set('schedule', next))
  );

  constructor(
    private store: Store,
    private database: AngularFireDatabase,
    private authService: AuthService
  ) {}

  updateItems(items: any[]) {
    this.itemList$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private createSection(payload: ScheduleItem) {
    this.database.list(`schedule/${this.authService.uid}`).push(payload);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    delete payload.$key;
    this.database
      .object(`schedule/${this.authService.uid}/${key}`)
      .update(payload);
  }

  private getSchedule(
    startAt: number,
    endAt: number
  ): Observable<ScheduleList> {
    return this.database
      .list<ScheduleList[]>(`schedule/${this.authService.uid}`, (ref) => {
        return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt);
      })
      .snapshotChanges()
      .pipe(
        map((snapshot: SnapshotAction<any[]>[]) => {
          const schedule: any[] = snapshot.map(
            (value: SnapshotAction<any[]>) => {
              console.log(value.payload.val())
              return { ...(value.payload.val() as ScheduleList | null), $key: value.key, };
            }
          );
          return schedule;
        })
      );
  }
}
