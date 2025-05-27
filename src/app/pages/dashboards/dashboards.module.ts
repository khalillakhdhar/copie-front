import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { BsDropdownConfig} from 'ngx-bootstrap/dropdown';

import { FormsModule, NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
@NgModule({
  declarations: [
   
   
    ProfileComponent,
            ProfileSummaryComponent,
            ProfileEditComponent
 
  ],
  imports: [
    DashboardsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    FormsModule
 
  ],
  providers: [BsDropdownConfig],
})
export class DashboardsModule { }
