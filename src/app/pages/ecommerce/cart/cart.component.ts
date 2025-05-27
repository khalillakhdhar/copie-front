import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { fetchCartData } from 'src/app/store/Cart/cart.action';
import { selectData } from 'src/app/store/Cart/cart-selector';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/shared/services/cart.service';

import { ToastrService } from 'ngx-toastr';
const BASE_FILE_URL = 'http://31.97.36.146:8080/files/';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

/**
 * Ecommerce Cart component
 */
export class CartComponent implements OnInit{

  // bread crumb items
  breadCrumbItems: Array<{}>;
  constructor(
    public cartService: CartService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Cart', active: true }];
  }
  
  async increaseQty(id: number) {
    const product = this.cartService.getCurrentCart().find(item => item.id === id);
    if (product && product.qty < product.stock) {
      this.cartService.updateQuantity(id, product.qty + 1);
    } else {
      this.toastr.warning('Quantité maximale disponible atteinte', 'Stock', {
        timeOut: 3000,
        progressBar: true,
      });
    }
  }

  decreaseQty(id: number) {
    const product = this.cartService.getCurrentCart().find(item => item.id === id);
    if (product && product.qty > 1) {
      this.cartService.updateQuantity(id, product.qty - 1);
    }
  }

  getGrandTotal(): number {
    return this.cartService.getCurrentCart().reduce((sum, item) => sum + item.total, 0);
  }
  async removeItem(id: number) {
    const product = this.cartService.getCurrentCart().find(item => item.id === id);
    
    const result = await Swal.fire({
      title: 'Confirmation',
      html: `Voulez-vous vraiment supprimer <b>${product?.name}</b> du panier ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true,
      customClass: {
        popup: 'animated bounceIn'
      }
    });

    if (result.isConfirmed) {
      this.cartService.removeItem(id);
      this.toastr.success('Produit supprimé du panier', 'Succès', {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }
}