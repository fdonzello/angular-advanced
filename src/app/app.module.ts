import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { AuthEffects } from './auth/auth.effects';
import { NavigationComponent } from './navigation.component';
import { reducers } from './reducers';
import { AppRoutingModule } from './router/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavigationComponent
  ],
  providers: [
    provideStore(reducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([AppEffects, AuthEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
