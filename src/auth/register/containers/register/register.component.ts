import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  styleUrls: ['../../../shared/styles/login-register.scss', './register.component.scss'],
  template: `
    <div class="login-register-wrapper">
      <app-form (submitted)="registerUser($event)">
        <h1>Registrácia</h1>
        <a routerLink="/auth/login">Chcete sa prihlásiť?</a>
        <button type="submit">Registrovať</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </app-form>
    </div>
  `,
})
export class RegisterComponent {
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  async registerUser(event: FormGroup) {
    const { email, password } = event.value; // Destructuring
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
