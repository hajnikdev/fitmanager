import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

// Interface from auth service
import { User } from './auth/shared/services/auth/auth.service';

// Interface
import { Meal } from './health/shared/services/meals/meals.service';
import { ScheduleItem } from './health/shared/services/schedule/schedule.service';
import { Workout } from './health/shared/services/workouts/workouts.service';


export interface State {
  user: User | null;
  selected: any,
  list: any,
  meals: Meal[];
  schedule: ScheduleItem[];
  date: Date | null,
  workouts: Workout[];
  [key: string]: any;
}

const state: State = {
  user: null,
  selected: undefined,
  list: undefined,
  meals: [],
  schedule: [],
  date: null,
  workouts: []
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
