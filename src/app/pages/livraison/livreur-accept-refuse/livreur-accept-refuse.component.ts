import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LivraisonService } from 'src/app/shared/services/livraison.service';
import { Page } from 'src/app/shared/classes/entities/page';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Delivery } from 'src/app/shared/classes/entities/delivery';
import { DeliveryService } from 'src/app/shared/services/delivery.service';
@Component({
  selector: 'app-livreur-accept-refuse',
  templateUrl: './livreur-accept-refuse.component.html',
  styleUrl: './livreur-accept-refuse.component.css'
})
export class LivreurAcceptRefuseComponent implements OnInit {
  livreurId!: number;
  
  livraisons: Delivery[] = [];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
  const storedId = localStorage.getItem('userId');
  const role=localStorage.getItem("role");
  console.log(storedId);
  console.log(role);
  this.livreurId = storedId ? +storedId : null;

  if (this.livreurId) {
    this.loadLivraisons();
  } else {
    console.error("Aucun ID trouvé dans le localStorage.");
  }

  }

  loadLivraisons(): void {
    this.deliveryService.getLivraisonsEnAttenteByLivreur(this.livreurId).subscribe(data => {
      console.log("Réponse API :", data);
      console.log("Livreur ID utilisé :", this.livreurId)
      this.livraisons = data;
    });
  }

  traiterLivraison(livraisonId: number, accepte: boolean): void {
    this.deliveryService.traiterLivraison(livraisonId, accepte).subscribe(() => {
      this.loadLivraisons(); // Rafraîchit la liste après l'action
    });
  }
}
