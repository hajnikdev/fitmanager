import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  template: `
    <div>
      <app-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit">Register</button>
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
    } catch (error) {
      this.error = error.message;
    }
  }
}
