import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { depositAction, resetRequestAction, selectBalance, selectRequest, withdrawAction } from './bank-account.store';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private readonly store = inject(Store)

  get balance$() {
    return this.store.select(selectBalance)
  }

  get request$() {
    return this.store.select(selectRequest)
  }

  deposit(amount: number) {
    this.store.dispatch(depositAction({ amount }))
  }

  withdraw(amount: number) {
    this.store.dispatch(withdrawAction({ amount }))
  }

  resetRequest() {
    this.store.dispatch(resetRequestAction())
  }
}
