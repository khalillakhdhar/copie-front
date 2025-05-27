import { Component, OnInit } from '@angular/core';

import { fetchInvoiceListData } from 'src/app/store/Invoices/invoice.action';
import { Store } from '@ngrx/store';
import { selectData } from 'src/app/store/Invoices/invoice-selector';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Facture } from 'src/app/shared/classes/entities/facture';
import { FactureService } from 'src/app/shared/services/facture.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * Invoices list component
 */
export class ListComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  factures: Facture[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 5;

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.getFactures();
  }

  getFactures(): void {
    this.factureService.getFacturesUtilisateur(this.currentPage, this.pageSize).subscribe(response => {
      this.factures = response.content;
      this.totalPages = response.totalPages;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getFactures();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getFactures();
    }
  }
}