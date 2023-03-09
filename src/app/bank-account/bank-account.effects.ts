import { inject, Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { delay, map } from "rxjs";
import { depositAction, depositFailedAction, depositSuccessAction, selectBalance, withdrawAction, withdrawFailedAction, withdrawSuccessAction } from "./bank-account.store";

@Injectable()
export class BankAccountEffects {
    private readonly store = inject(Store)

    private readonly actions$ = inject(Actions)

    onDeposit$ = createEffect(() => this.actions$.pipe(
        ofType(depositAction),
        delay(2500),
        concatLatestFrom((_) => this.store.select(selectBalance)),
        map(([{ amount }, balance]) => {
            if (amount <= 0) {
                return depositFailedAction({ reason: 'invalid amount' })
            }

            const newBalance = amount + balance;
            return depositSuccessAction({ newBalance: newBalance })
        })
    ))

    onWithdraw$ = createEffect(() => this.actions$.pipe(
        ofType(withdrawAction),
        delay(2500),
        concatLatestFrom((_) => this.store.select(selectBalance)),
        map(([{ amount }, balance]) => {
            if (amount <= 0) {
                return withdrawFailedAction({ reason: 'invalid amount' })
            }

            if (amount > balance) {
                return withdrawFailedAction({ reason: 'insufficient funds' })
            }

            const newBalance = amount - balance;
            return withdrawSuccessAction({ newBalance: newBalance })
        })
    ))
}