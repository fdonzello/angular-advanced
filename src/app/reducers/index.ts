import { isDevMode } from '@angular/core';
import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { authReducer } from '../auth/auth.reducer';

export interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  status: 'loading' | 'failed' | 'idle';
}

export interface AppState {
  auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
