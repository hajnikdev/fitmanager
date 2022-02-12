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
  meals$: Observable<Meal[]> | null = null;
  user$: Observable<User | null> = this.authService.authState.pipe(
    tap((user: any) => {
      this.meals$ = this.database
        .list<Meal[]>(`meals/nGMzflWggQW0qH8WXtJ4umCZvpt2`)
        .snapshotChanges()
        .pipe(tap((next: any[]) => this.store.set('meals', next)));
    })
  );

  constructor(
    private store: Store,
    private database: AngularFireDatabase,
    private authService: AuthService
  ) {}
}
