import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { AccidentResponse } from 'src/app/shared/classes/entities/accidentResponse';
import { AccidentService } from 'src/app/shared/services/accident.service';
@Component({
  selector: 'app-admin-accident-map',
  templateUrl: './admin-accident-map.component.html',
  styleUrl: './admin-accident-map.component.css'
})
export class AdminAccidentMapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private accidentService: AccidentService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([33.8869, 9.5375], 6); // Vue centrée sur la Tunisie

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Données © OpenStreetMap',
    }).addTo(this.map);

    this.accidentService.getAccidents().subscribe((accidents: AccidentResponse[]) => {
      accidents.forEach(acc => {
        L.marker([acc.latitude, acc.longitude])
          .addTo(this.map)
          .bindPopup(`<strong>Gravité:</strong> ${acc.severity}<br><strong>Livreur:</strong> ${acc.livreurName}<br><strong>Date:</strong> ${acc.dateAccident}`);
      });
    });
  }
}