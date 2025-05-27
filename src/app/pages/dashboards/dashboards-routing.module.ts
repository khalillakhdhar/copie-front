
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DefaultComponent } from './default/default.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';





const routes: Routes = [
    {
        path: 'default',
        component: DefaultComponent
    },
    {
        path: 'profil',
        component: ProfileComponent
    },
    {
        path: 'profilSummary',
        component: ProfileSummaryComponent
    },
    {
        path: 'profilEdit',
        component: ProfileEditComponent
    },


   
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
