import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { OrderService } from 'src/app/shared/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { FactureService } from 'src/app/shared/services/facture.service';
import { CommandeRequestDTO } from 'src/app/shared/classes/entities/commandeRequestDTO ';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

/**
 * Ecommerce checkout component
 */
export class CheckoutComponent implements OnInit {
  livraisonForm!: FormGroup;
  constructor(
   
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    public cartService: CartService,
    private toastr: ToastrService,
    private factureService: FactureService
    
  ) {}
 
  ngOnInit(): void {
    this.livraisonForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      pays: ['', Validators.required],
      notesCommande: [''],
      modeLivraison: ['DOMICILE', Validators.required]  // Valeur par défaut
    });
  }

  getSubtotal(): number {
    return this.cartService.getCurrentCart().reduce((sum, item) => sum + item.total, 0);
  }

  getGrandTotal(): number {
    return this.getSubtotal(); 
  }

  goBack() {
    this.router.navigate(['/ecommerce/cart']);
  }

 /* confirmOrder() {
     if (this.livraisonForm.invalid) {
    Swal.fire('Erreur', 'Veuillez remplir tous les champs de livraison.', 'warning');
    return;
  }
    Swal.fire({
      title: 'Confirmer la commande',
      text: 'Voulez-vous finaliser cette commande ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, confirmer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Ici vous ajouteriez la logique pour enregistrer la commande
        this.cartService.clearCart();
        this.router.navigate(['invoices/list']);
      }
    });
  }*/
    confirmOrder() {
      if (this.livraisonForm.invalid) {
        this.toastr.error("Veuillez remplir toutes les informations obligatoires.");
        return;
      }
    
      const formValue = this.livraisonForm.value;
      console.log("information de formulaire",formValue);
      const cartItems = this.cartService.getCurrentCart();
      console.log("Cart items:", cartItems);
      const produitIds = cartItems.map(item => item.id);
       console.log("Les produits:", produitIds);
      const total = cartItems.reduce((acc, item) => acc + item.total, 0);
    
      const commande: CommandeRequestDTO = {
        ...formValue,
        produitIds,
        total
      };
      console.log("la commande",commande)
    
      this.orderService.createOrder(commande).subscribe({
        next: (res) => {
          console.log("Commande créée :", res);
          this.toastr.success("Commande créée avec succès !");
          console.log("Création facture avec :", {
          commandeId: res.id,
          utilisateurId: res.utilisateur?.id,
          montantTotal: total
});

             this.factureService.createFacture(res.id, res.utilisateur.id, total).subscribe({
      next: (facture) => {
        this.toastr.success("Facture générée !");
        this.cartService.clearCart();
        setTimeout(() => {
          this.router.navigate(['/invoices/list']);
        }, 2000);
      },
      error: () => {
        this.toastr.error("La commande a été créée, mais la facture a échoué.");
        this.router.navigate(['/invoices/list']);
      }
    });
  },
  error: () => {
    this.toastr.error("Échec de la création de la commande.");
  }
});
    }
    
  cancelOrder() {
    Swal.fire({
      title: 'Annuler la commande',
      text: 'Êtes-vous sûr de vouloir annuler cette commande ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annuler',
      cancelButtonText: 'Non, garder la commande'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart();
        this.router.navigate(['/ecommerce/products']);
      }
    });
  }
}