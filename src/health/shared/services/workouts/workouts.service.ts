import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/database';

import { Store } from 'store';
import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';

export interface Workout {
  name: string | null;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number | null;
  $key: string | null;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<Workout[]> | null = this.database
    .list<Workout[]>(`workouts/${this.authService.uid}`)
    .snapshotChanges()
    .pipe(
      map((snapshot: SnapshotAction<Workout[]>[]) => {
        const workouts: Workout[] = snapshot.map(
          (value: SnapshotAction<Workout[]>) => {
            const data = value.payload.val() as Workout | null;
            return {
              name: data?.name ?? null,
              type: data?.type ?? '',
              strength: data?.strength,
              endurance: data?.endurance,
              timestamp: null,
              $key: value.key,
              $exists: value.payload.exists,
            };
          }
        );

        this.store.set('workouts', workouts);
        return workouts;
      })
    );

  constructor(
    private store: Store,
    private database: AngularFireDatabase,
    private authService: AuthService
  ) {}

  getWorkout(key: string): Observable<{} | Workout | undefined> {
    if (!key) return of({});
    return this.store.select<Workout[]>('workouts').pipe(
      filter((workouts) => !!workouts),
      map((workouts: Workout[]) => {
        return workouts.find((workout) => workout.$key === key);
      })
    );
  }

  addWorkout(workout: Workout) {
    return this.database.list(`workouts/${this.authService.uid}`).push(workout);
  }

  updateWorkout(key: any, workout: Workout) {
    return this.database
      .object(`workouts/${this.authService.uid}/${key}`)
      .update(workout);
  }

  removeWorkout(key: any) {
    return this.database.list(`workouts/${this.authService.uid}`).remove(key);
  }
}
