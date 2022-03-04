import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

// Services
import {
  ScheduleService,
  ScheduleItem,
} from 'src/health/shared/services/schedule/schedule.service';

// Models
import {
  Meal,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';
import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;

  date$: Observable<Date> | null = null;
  selected$: Observable<any> | null = null;
  list$: Observable<Meal[] | Workout[]> | null = null;
  subscriptions: (Subscription | null | undefined)[] = [];

  schedule$: Observable<ScheduleItem[]> | null = null;

  constructor(
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$?.subscribe(),
      this.workoutsService.workouts$?.subscribe(),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription?.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }
}
