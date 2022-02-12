import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  constructor(private angularFire: AngularFireAuth) {}

  createUser(email: string, password: string) {
    return this.angularFire.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFire.signInWithEmailAndPassword(email, password);
  }
}
