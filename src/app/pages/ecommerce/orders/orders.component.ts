import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import { PaginationComponent, PaginationModule } from 'ngx-bootstrap/pagination';

// Date Format
import { DatePipe } from '@angular/common';

import { selectData } from 'src/app/store/orders/order-selector';
import { addEcoOrders, deleteEcoOrders, fetchEcoorderDataData, updateEcoOrders } from 'src/app/store/orders/order.actions';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/shared/classes/entities/product';
import { Supplier } from 'src/app/shared/classes/entities/supplier';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/classes/entities/order';
import { TypeOrder } from 'src/app/shared/classes/enums/typeOrder.enum';
import { Page } from 'src/app/shared/classes/entities/page';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})

/**
 * Ecommerce orders component
 */
export class OrdersComponent  implements OnInit {
  commandes: Order[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(private commandeService: OrderService) { }

  ngOnInit(): void {
    this.getCommandes();
  }

  // Récupérer les commandes paginées
  getCommandes(page: number = 0): void {
    this.commandeService.getAllOrders(page, this.pageSize).subscribe((data: Page<Order>) => {
      this.commandes = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = data.number;
    });
  }
  getTotalAmount(commande: Order): number {
  return commande.produits.reduce((total, produit) => total + produit.prix, 0);
}
  

  // Changer la page
  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.getCommandes(page); // Récupérer les commandes pour la page sélectionnée
    }
  }
}
