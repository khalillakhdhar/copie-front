import { Component,OnInit } from '@angular/core';
import { LivraisonService } from 'src/app/shared/services/livraison.service';
import { Page } from 'src/app/shared/classes/entities/page';
import { PageEvent } from '@angular/material/paginator';
import { Order } from 'src/app/shared/classes/entities/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { Supplier } from 'src/app/shared/classes/entities/supplier';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-attribution',
  templateUrl: './admin-attribution.component.html',
  styleUrls: ['./admin-attribution.component.css']
})
export class AdminAttributionComponent implements OnInit {
  orders: Order[] = [];
  suppliers: Supplier[] = [];
  selectedOrderId: number | null = null;

  page: number = 0;
  size: number = 10;

  constructor(
    private orderService: OrderService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadSuppliers();
  }

  loadOrders(): void {
    this.orderService.getCommandesEnCours().subscribe(data => {
      this.orders = data;
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAvailableSuppliers(this.page, this.size).subscribe((data: Page<Supplier>) => {
      this.suppliers = data.content;
    });
  }

  openAssignModal(orderId: number): void {
    this.selectedOrderId = orderId;

    const modalElement = document.getElementById('assignModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  assignLivreur(supplierId: number): void {
    if (this.selectedOrderId != null) {
      this.orderService.assignLivreur(this.selectedOrderId, supplierId).subscribe(() => {
        this.loadOrders();
        this.selectedOrderId = null;

        // Fermer le modal après assignation
        const modalElement = document.getElementById('assignModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }
      });
    }
  }
}