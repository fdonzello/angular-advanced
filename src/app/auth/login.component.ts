import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { emailField, passwordField } from '../forms/fields';
import { BsInvalidFieldDirective } from '../shared/bs-invalid-field.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Login</h1>
    </div>

    <div class="container container-login">
        <div class="row">
            <div class="col-sm">

                <form [formGroup]="form" (submit)="submit()">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            formControlName="email" placeholder="Enter email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                            else.</small>

                      <ng-container *ngIf="email?.invalid">
                          <div class="invalid-feedback" *ngIf="email?.hasError('required')">
                            This field is required
                          </div>
                          <div class="invalid-feedback" *ngIf="email?.hasError('allowedDomains')">
                            Your email provider is not supported. Use one of: 
                            {{ email?.getError('allowedDomains').allowed }}
                          </div>
                      </ng-container>

                        
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" formControlName="password"
                            placeholder="Password">

                        <ng-container *ngIf="password?.invalid">
                            <div class="invalid-feedback" *ngIf="password?.hasError('required')">
                              This field is required
                            </div>
                            <div class="invalid-feedback" *ngIf="password?.hasError('minlength')">
                              {{ password?.getError('minlength').actualLength }} / {{ password?.getError('minlength').requiredLength }}
                            </div>
                        </ng-container>
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" formControlName="policy">
                        <label class="form-check-label" for="exampleCheck1">I accept every single policy</label>
                    </div>
                    <button type="submit" class="btn btn-primary" [disabled]="form.invalid || (posting$ | async)">Login</button>
                </form>
            </div>
        </div>
    </div>
  `,
  styles: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    BsInvalidFieldDirective
  ]
})
export default class LoginComponent {

  form = inject(FormBuilder).group({
    email: emailField,
    password: passwordField,
    policy: [false, [Validators.requiredTrue]]
  })

  auth = inject(AuthService)

  posting$ = this.auth.authState$.pipe(map(a => a.status == 'loading'))

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  submit() {
    const value = this.form.getRawValue();
    this.auth.login(value.email, value.password)
  }
}
