import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from 'store';
import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> | null = this.database
    .list<Meal[]>(`meals/${this.authService.uid}`)
    .snapshotChanges()
    .pipe(tap((next: any[]) => this.store.set('meals', next)));

  constructor(
    private store: Store,
    private database: AngularFireDatabase,
    private authService: AuthService
  ) {}

  async addMeal(meal: Meal) {
    const user = await this.authService.currentUser;
    console.log('User uid: ', user?.uid);
    if (user) {
      return this.database.list(`meals/${user?.uid}`).push(meal);
    }
    throw new Error('Unauthenticated user!');
  }
}
