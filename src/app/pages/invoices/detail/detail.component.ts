import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facture } from 'src/app/shared/classes/entities/facture';
import { FactureService } from 'src/app/shared/services/facture.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/classes/entities/user';
import { Delivery } from 'src/app/shared/classes/entities/delivery';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

/**
 * Invoices Detail component
 */
export class DetailComponent implements OnInit {

 // bread crumb items
 breadCrumbItems: Array<{}>;
 facture: Facture | null = null;
 livraisons:Delivery;
 factureId!: number;
  userId!: number;
  utilisateur!:User;
 constructor(
   private route: ActivatedRoute,
    private factureService: FactureService,
    private userService: UserService
 ) {
    
  }

 ngOnInit() {
   this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Detail', active: true }];
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      console.log('Paramètre reçu :', idParam); 
      const idF= Number(idParam);

      if (!isNaN(idF)) {
  this.factureId = idF;
  this.getFactureDetails(this.factureId);
} else {
  console.error('ID de facture invalide :', idParam);
}
      const id = localStorage.getItem('userId');
      if (id) {
      this.userId = +id;
      this.loadUserData();
    }
    });
 }
 getFactureDetails(id: number): void {
    this.factureService.getFactureById(id).subscribe({
      next: (data) => {
        
        this.facture = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la facture', err);
      }
    });
  }
  loadUserData() {
  this.userService.getUserById(this.userId).subscribe({
    next: (data) => {
      console.log(data);
      this.utilisateur = data;
    },
    error: (err) => {
      console.error('Erreur de chargement utilisateur', err);
    }
  });
}
}
