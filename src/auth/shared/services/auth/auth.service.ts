import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Store } from 'store';

import { AngularFireAuth } from '@angular/fire/auth';

export interface User {
  email: string | null;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.angularFire.authState.pipe(
    tap((next) => {
      if (!next) {
        this.store.set('user', null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true,
      };
      this.store.set('user', user);
    })
  );
  constructor(private angularFire: AngularFireAuth, private store: Store) {}

  createUser(email: string, password: string) {
    return this.angularFire.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFire.signInWithEmailAndPassword(email, password);
  }
}
