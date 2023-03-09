import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { BankAccountEffects } from "./bank-account.effects";
import { bankAccountFeature } from "./bank-account.store";
import { DashboardComponent } from "./dashboard/dashboard.component";

export default [
    {
        path: '',
        component: DashboardComponent,
        providers: [
            provideState(bankAccountFeature),
            provideEffects(BankAccountEffects)
        ]
    }
] as Routes;
