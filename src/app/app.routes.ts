import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './extrapages/page404/page404.component';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { SignupComponent } from './account/auth/signup/signup.component';
import { LoginComponent } from './account/auth/login/login.component';

export const routes: Routes = [

    {
        path: "auth",
        loadChildren: () =>
            import("./account/account.module").then((m) => m.AccountModule),
    },
    {
        path: "",
        component: LayoutComponent,
        loadChildren: () =>
            import("./pages/pages.module").then((m) => m.PagesModule),
        canActivate: [AuthGuard],//bech nzitou token
    },
    
   
    { path: "**", component: Page404Component },// Redirige vers page404 pour toute autre route non reconnue
];
