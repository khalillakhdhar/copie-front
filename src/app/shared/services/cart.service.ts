import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../classes/entities/cartItem';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();
  getCurrentCart(): CartItem[] {
    return this.cartItems.value;
  }
  constructor(
    private toastr:ToastrService
  ) {
    // Charger le panier depuis localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) this.cartItems.next(JSON.parse(savedCart));
  }

  addToCart(product: CartItem) {
    const currentCart = this.cartItems.value;
    const existingProduct = currentCart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.qty += 1;
      existingProduct.total = existingProduct.price * existingProduct.qty;
    } else {
      currentCart.push({ ...product, qty: 1, total: product.price });
    }

    this.updateCart(currentCart);
  }

  updateQuantity(id: number, newQty: number) {
    const currentCart = this.cartItems.value.map(item => {
      if (item.id === id) {
        if (newQty > item.stock) {
          alert(`Quantité maximale disponible: ${item.stock}`);
          return item;
        }
        item.qty = newQty;
        item.total = item.price * newQty;
      }
      return item;
    });
    this.updateCart(currentCart);
  }  

  removeItem(id: number) {
    const currentCart = this.cartItems.value.filter(item => item.id !== id);
    this.updateCart(currentCart);
    this.toastr.success('Produit supprimé');
  }

  private updateCart(cart: CartItem[]) {
    this.cartItems.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart)); // Sauvegarde
  }
  clearCart(): void {
    this.cartItems.next([]); // Vide le panier
    localStorage.removeItem('cart'); // Supprime du localStorage
  }
  immediatePurchase(product: CartItem) {
    const singleItemCart = [{ 
      ...product, 
      qty: 1, 
      total: product.price 
    }];
    this.updateCart(singleItemCart);
  }
  
}