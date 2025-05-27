import { Component, OnDestroy, OnInit } from '@angular/core';
import { Position } from 'src/app/shared/classes/entities/position';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-tracking-live-livreur',
  templateUrl: './tracking-live-livreur.component.html',
  styleUrl: './tracking-live-livreur.component.css'
})
export class TrackingLiveLivreurComponent implements OnInit, OnDestroy {

  currentPosition: google.maps.LatLngLiteral | null = null;
  markerPosition: google.maps.LatLngLiteral | null = null;
  zoom = 15;
  trackingIntervalId: any;
  livreurId: number | null = null;

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    this.loadLivreurIdFromLocalStorage();
    if (this.livreurId) {
      this.updatePosition();
      this.trackingIntervalId = setInterval(() => {
        this.updatePosition();
      }, 60000); 
    } else {
      console.error("Aucun ID livreur trouvé dans le localStorage.");
    }
  }

  ngOnDestroy(): void {
    if (this.trackingIntervalId) {
      clearInterval(this.trackingIntervalId);
    }
  }

  loadLivreurIdFromLocalStorage(): void {
    const storedId = localStorage.getItem('userId');
   
    if (storedId) {
      this.livreurId = +storedId;
    }
  }

  updatePosition(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const timestamp = new Date().toISOString();

        this.currentPosition = { lat, lng };
        this.markerPosition = { lat, lng };

        if (this.livreurId) {
          const pos: Position = {
            id: 0,
            latitude: lat,
            longitude: lng,
            timestamp: timestamp,
            livreurId: this.livreurId,
            createdAt: timestamp,
            updatedAt: timestamp
          };

          this.positionService.createPosition(pos).subscribe({
            next: () => console.log("Position enregistrée",pos),
            error: (err) => console.error("Erreur enregistrement position :", err)
          });
        }
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }
}
