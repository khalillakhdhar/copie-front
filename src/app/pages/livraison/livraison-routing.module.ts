import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonComponent } from './livraison.component';
import { AdminAttributionComponent } from './admin-attribution/admin-attribution.component';

import { LivreurAcceptRefuseComponent } from './livreur-accept-refuse/livreur-accept-refuse.component';


const routes: Routes = [
  { path: 'adminAttribution', 
    component: AdminAttributionComponent },

  { path: 'livreurAcceptRefuse', 
      component: LivreurAcceptRefuseComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
