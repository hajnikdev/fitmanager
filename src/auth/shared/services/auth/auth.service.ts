import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

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
