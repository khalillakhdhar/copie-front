
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';


import { SignupComponent } from './signup/signup.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { MailresetpasswordComponent } from './mailresetpassword/mailresetpassword.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { SignupsupplierComponent } from './signupsupplier/signupsupplier.component';



const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
  
    
    {
        path: 'reset-password',
        component: PasswordresetComponent
    },
    { path: 'mailResetPassword', component: MailresetpasswordComponent },
   
    {
        path: 'loginAdmin',
        component: LoginAdminComponent
    },
     {
        path: 'signupsupplier',
        component: SignupsupplierComponent
    },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
