import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader'; 
import { Delivery } from 'src/app/shared/classes/entities/delivery';
import { Order } from 'src/app/shared/classes/entities/order';
import { Position } from 'src/app/shared/classes/entities/position';
import { DeliveryService } from 'src/app/shared/services/delivery.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-client-tracking',
  templateUrl: './client-tracking.component.html',
  styleUrl: './client-tracking.component.css'
})
export class ClientTrackingComponent implements OnInit, OnDestroy {
  commandeId: number = 0;
  livreurId: number | null = null;
  positionActuelle: google.maps.LatLngLiteral | null = null;
  zoom: number = 15;
  refreshInterval: any;
  positionIndisponible: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    // Récupérer ID commande depuis l'URL (route)
    this.commandeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.commandeId) {
      this.getCommandeEtLivreur(this.commandeId);
    }

    // Rafraîchir position toutes les 60 secondes
    this.refreshInterval = setInterval(() => {
      this.updatePosition();
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  getCommandeEtLivreur(id: number): void {
    this.orderService.getOrderById(id).subscribe({
      next: (commande: Order) => {
        this.livreurId = commande.livraison?.livreur?.id ?? null;
        if (this.livreurId) {
          this.updatePosition();
        } else {
          console.error("Aucun livreur assigné à cette commande.");
        }
      },
      error: (err) => console.error("Erreur récupération commande :", err)
    });
  }

  updatePosition(): void {
    if (!this.livreurId) return;

    this.positionService.getLastPositionByLivreurId(this.livreurId).subscribe({
      next: (pos: Position) => {
        if (pos && pos.latitude && pos.longitude) {
          this.positionActuelle = {
            lat: pos.latitude,
            lng: pos.longitude
          };
          this.positionIndisponible = false;
        } else {
          this.afficherMessagePositionIndisponible();
        }
      },
      error: () => {
        this.afficherMessagePositionIndisponible();
      }
    });
  }

  afficherMessagePositionIndisponible(): void {
    this.positionIndisponible = true;
    Swal.fire({
      icon: 'info',
      title: 'Position non disponible',
      text: 'La livraison n’a pas encore démarré. La position du livreur sera affichée dès qu’elle sera disponible.',
      confirmButtonText: 'Ok'
    });
  }

}