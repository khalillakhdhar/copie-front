import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { PasswordresetComponent } from './auth/passwordreset/passwordreset.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    AccountRoutingModule,
    CommonModule,
    AuthModule,
    ReactiveFormsModule
  
  ]
})
export class AccountModule { }
