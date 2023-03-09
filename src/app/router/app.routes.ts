import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'auth',
        loadChildren: () => import('./../auth/auth.routes')
    },
    {
        path: 'bank',
        loadChildren: () => import('./../bank-account/bank-account.routes')
    }
];
