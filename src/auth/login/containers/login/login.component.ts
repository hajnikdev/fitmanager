import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  styleUrls: ['../../../shared/styles/login-register.scss', './login.component.scss'],
  template: `
    <div class="login-register-wrapper">
      <app-form (submitted)="loginUser($event)">
        <h1>Prihlásenie</h1>
        <a routerLink="/auth/register">Chcete sa registrovať?</a>
        <button type="submit">Prihlásiť</button>
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
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
