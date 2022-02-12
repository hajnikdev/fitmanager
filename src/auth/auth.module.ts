import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Firebase third-party-module
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Shared module
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
    ],
  },
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyB52WEXbWKe4d_Hlw3ng1QAacSxdWVA1Eg',
  authDomain: 'fitmanager-7d167.firebaseapp.com',
  databaseURL:
    'https://fitmanager-7d167-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fitmanager-7d167',
  storageBucket: 'fitmanager-7d167.appspot.com',
  messagingSenderId: '845259335659',
  appId: '1:845259335659:web:da1287052d6268e3b51bae',
  measurementId: 'G-26Y40L3X12',
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
  ],
})
export class AuthModule {}
