import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  template: `
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand black" routerLink="/">Angular by Francesco Donzello</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:
true}">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/bank" routerLinkActive="active">Bank</a>
            </li>
          </ul>
          <a routerLink="/auth/login" class="btn btn-outline-success" *ngIf="!(isLoggedIn$ | async)">Login</a>
          <button class="btn btn-outline-success" (click)="logout()" *ngIf="(isLoggedIn$ | async)">Logout</button>
        </div>
      </div>
    </nav>
  `,
  styles: [
  ]
})
export class NavigationComponent {
  private readonly auth = inject(AuthService);
  readonly isLoggedIn$ = this.auth.authState$.pipe(map(a => a.isLoggedIn))

  logout() {
    this.auth.logout();
  }
}
