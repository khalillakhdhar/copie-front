import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

// Leaflet Map
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MapsRoutingModule } from './maps-routing.module';
import { TrackingLiveLivreurComponent } from './tracking-live-livreur/tracking-live-livreur.component';
import { ClientTrackingComponent } from './client-tracking/client-tracking.component';
import { AdminSuiviLivraisonsComponent } from './admin-suivi-livraisons/admin-suivi-livraisons.component';

@NgModule({
  declarations: [
    TrackingLiveLivreurComponent,
    ClientTrackingComponent,
    AdminSuiviLivraisonsComponent
  ],
  imports: [
    MapsRoutingModule,
    GoogleMapsModule,
    CommonModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapsModule { }
