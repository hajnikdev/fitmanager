import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/database';

import { Store } from 'store';
import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';

export interface Meal {
  name: string | null;
  ingredients: string[];
  timestamp: number | null;
  $key: string | null;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> | null = this.database
    .list<Meal[]>(`meals/${this.authService.uid}`)
    .snapshotChanges()
    .pipe(
      map((snapshot: SnapshotAction<Meal[]>[]) => {
        const meals: Meal[] = snapshot.map((value: SnapshotAction<Meal[]>) => {
          const data = value.payload.val() as Meal | null;
          return {
            name: data?.name ?? null,
            ingredients: data?.ingredients ?? [],
            timestamp: null,
            $key: value.key,
            $exists: value.payload.exists,
          };
        });

        console.log(meals);
        this.store.set('meals', meals);
        return meals;
      })
    );

  constructor(
    private store: Store,
    private database: AngularFireDatabase,
    private authService: AuthService
  ) {}

  async addMeal(meal: Meal) {
    return this.database.list(`meals/${this.authService.uid}`).push(meal);
  }

  async removeMeal(key: any) {
    return this.database.list(`meals/${this.authService.uid}`).remove(key);
  }
}
