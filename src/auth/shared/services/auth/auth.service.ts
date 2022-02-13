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
  private _uid: string | null = null;
  auth$ = this.angularFire.authState.pipe(
    tap((next) => {
      if (!next) {
        this.store.set('user', null);
        return;
      }
      this.uid = next.uid;
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true,
      };
      this.store.set('user', user);
    })
  );
  constructor(private angularFire: AngularFireAuth, private store: Store) {}

  get authState() {
    return this.angularFire.authState;
  }

  get currentUser() {
    return this.angularFire.currentUser;
  }

  get uid(): string | null {
    return this._uid;
  }

  set uid(value: string | null) {
    this._uid = value;
  }

  createUser(email: string, password: string) {
    return this.angularFire.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFire.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.angularFire.signOut();
  }
}
