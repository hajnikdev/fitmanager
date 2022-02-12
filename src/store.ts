import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

// Interface from auth service
import { User } from './auth/shared/services/auth/auth.service';

// Interface from meals service
import { Meal } from './health/shared/services/meals/meals.service';

export interface State {
  user: User | null;
  meals: Meal[];
  [key: string]: any;
}

const state: State = {
  user: null,
  meals: [],
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
