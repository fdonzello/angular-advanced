import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, map, tap } from "rxjs";
import { loginAction, loginFailedAction, loginSuccessAction } from "./auth.reducer";

@Injectable()
export class AuthEffects {
    private readonly actions$ = inject(Actions)
    private readonly router = inject(Router)

    onLogin$ = createEffect(() => this.actions$.pipe(
        ofType(loginAction),
        delay(2500),
        map((action) => {
            if (action.email != 'test@gmail.com') {
                return loginFailedAction({ reason: 'invalid credentials' });
            }

            if (action.password != 'test123') {
                return loginFailedAction({ reason: 'invalid credentials' });
            }

            return loginSuccessAction({ username: action.email })
        })
    ))

    onLoginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => this.router.navigate(['/']))
    ), { dispatch: false })
}