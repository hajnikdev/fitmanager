import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  template: `
    <div>
      <app-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">Login</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </app-form>
    </div>
  `,
})
export class LoginComponent {
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  async loginUser(event: FormGroup) {
    const { email, password } = event.value; // Destructuring
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      this.error = error.message;
    }
  }
}
