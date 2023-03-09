import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { loginAction, logoutAction } from './auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  store = inject(Store);

  login(email: string, password: string) {
    this.store.dispatch(loginAction({ email, password }))
  }

  logout() {
    this.store.dispatch(logoutAction());
  }

  get authState$() {
    return this.store.select((state: AppState) => state.auth);
  }
}
