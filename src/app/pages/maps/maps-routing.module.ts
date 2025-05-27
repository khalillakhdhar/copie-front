import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeafletComponent } from "./leaflet/leaflet.component";
import { TrackingLiveLivreurComponent } from './tracking-live-livreur/tracking-live-livreur.component';
import { ClientTrackingComponent } from './client-tracking/client-tracking.component';
import { AdminSuiviLivraisonsComponent } from './admin-suivi-livraisons/admin-suivi-livraisons.component';

const routes: Routes = [
    
    {
        path: "leaflet",
        component: LeafletComponent
    }
    ,
     {
        path: "livreur",
        component: TrackingLiveLivreurComponent
    }
    ,{
        path: "suivi-livreur/:id",
        component: ClientTrackingComponent
    }
    ,
     ,{
        path: "admin-suivi",
        component: AdminSuiviLivraisonsComponent
    }
    ,
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapsRoutingModule { }
