import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivraisonRoutingModule } from './livraison-routing.module';
import { LivraisonComponent } from './livraison.component';

import { LivreurAcceptRefuseComponent } from './livreur-accept-refuse/livreur-accept-refuse.component';
import { AdminAttributionComponent } from './admin-attribution/admin-attribution.component';

import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    LivraisonComponent,
    
    LivreurAcceptRefuseComponent,
    AdminAttributionComponent,

  ],
  imports: [
    CommonModule,
    LivraisonRoutingModule,
    FormsModule,
    MatPaginatorModule,
  ]
})
export class LivraisonModule { }
