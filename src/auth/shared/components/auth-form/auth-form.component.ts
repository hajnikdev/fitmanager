import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  styleUrls: ['./auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <ng-content select="h1"></ng-content>

        <label>
          <span>Email</span>
          <input
            type="email"
            placeholder="Emailová adresa"
            formControlName="email"
          />
        </label>
        <div class="error" *ngIf="!emailInvalid && emailFormat">Nesprávny formát emailovej adresy</div>
        <div class="error" *ngIf="emailInvalid">Je potrebné zadať email</div>
        <label>
          <span>Heslo</span>
          <input
            type="password"
            placeholder="Zadajte heslo"
            formControlName="password"
          />
        </label>
        <div class="error" *ngIf="passwordInvalid">Je potrebné zadať heslo</div>

        <ng-content select=".error"></ng-content>
        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>
        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `,
})
export class AuthFormComponent {
  @Output() submitted = new EventEmitter<FormGroup>();

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control?.hasError('required') && control.touched;
  }

  get emailInvalid() {
    const control = this.form.get('email');
    return control?.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.form.get('email');
    return control?.hasError('email') && control.touched;
  }
}
