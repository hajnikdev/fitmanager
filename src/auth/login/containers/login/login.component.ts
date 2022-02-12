import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  template: `
    <div>
      <app-form>
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">Login</button>
      </app-form>
    </div>
  `,
})
export class LoginComponent {
  constructor() {}
}
