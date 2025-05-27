import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthRoutingModule } from './auth-routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { MailresetpasswordComponent } from './mailresetpassword/mailresetpassword.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SignupsupplierComponent } from './signupsupplier/signupsupplier.component';  

@NgModule({
  declarations: [
    
  
    MailresetpasswordComponent,
            LoginAdminComponent,
            SignupsupplierComponent,
            
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,  
  ]
})
export class AuthModule { }
