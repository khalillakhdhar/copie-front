import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Order } from 'src/app/shared/classes/entities/order';
import { Position } from 'src/app/shared/classes/entities/position';
import { OrderService } from 'src/app/shared/services/order.service';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-admin-suivi-livraisons',
  templateUrl: './admin-suivi-livraisons.component.html',
  styleUrl: './admin-suivi-livraisons.component.css'
})
export class AdminSuiviLivraisonsComponent implements OnInit, OnDestroy {

  commandes: Order[] = [];
  positions: { [livreurId: number]: Position } = {};
  intervalSubscription!: Subscription;
  markers: any[] = [];


map!: any;
  constructor(
    private orderService: OrderService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    this.loadData();
    // Actualiser toutes les 30 secondes
    this.intervalSubscription = interval(30000).subscribe(() => this.loadData());
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
  }

 loadData(): void {
  this.orderService.getCommandesConfirmée().subscribe(commandes => {
    console.log('Commandes confirmées reçues:', commandes);
    this.commandes = commandes;
    this.positions = {};

    const livreurIds: number[] = Array.from(
      new Set(
        commandes
          .filter(cmd => cmd.livraison && cmd.livraison.livreur && cmd.livraison.livreur.id !== undefined)
          .map(cmd => cmd.livraison.livreur.id)
      )
    );

    console.log('Livreurs IDs:', livreurIds);

    livreurIds.forEach(id => {
      this.positionService.getLastPositionByLivreurId(id).subscribe(position => {
        this.positions[id] = position;
        this.updateMap();
      });
    });
  });
}
  ngAfterViewInit(): void {
  this.initMap();
}

initMap(): void {
  this.map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 36.8065, lng: 10.1815 }, // Par exemple Tunis
  });
}
updateMap(): void {
  if (!this.map) return;

  // Supprimer les anciens marqueurs
  this.markers.forEach(marker => marker.setMap(null));
  this.markers = [];

  this.map.setZoom(12);

  Object.values(this.positions).forEach(position => {
    const marker = new google.maps.Marker({
      position: { lat: position.latitude, lng: position.longitude },
      map: this.map,
      title: `Livreur ID: ${position.livreurId}`
    });
    this.markers.push(marker);
  });
}

}