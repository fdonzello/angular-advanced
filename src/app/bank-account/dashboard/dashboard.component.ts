import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { BankAccountService } from '../bank-account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  private readonly _bank = inject(BankAccountService);
  private readonly fb = inject(FormBuilder);

  readonly balance$ = this._bank.balance$;
  readonly request$ = this._bank.request$;

  readonly depositOperationChoice = 'deposit';
  readonly withdrawOperationChoice = 'withdraw';

  readonly form = this.fb.group({
    amount: [0, [Validators.required]],
    operationType: [this.depositOperationChoice, [
      Validators.required,
      Validators.minLength(1)
    ]]
  });

  get posting$() {
    return this.request$.pipe(map((r) => r?.status == 'loading'));
  }

  get failed$() {
    return this.request$.pipe(map((r) => r?.status == 'failed'));
  }

  submit() {
    const amount = this.form.value.amount as number;
    const operationType = this.form.value.operationType as string;

    if (operationType === this.depositOperationChoice) {
      this._bank.deposit(amount);
    } else {
      this._bank.withdraw(amount);
    }
  }

  ngOnDestroy(): void {
    this._bank.resetRequest();
  }
}
