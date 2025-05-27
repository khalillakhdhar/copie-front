import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ChartType } from './apex.model';

import {
  linewithDataChart, basicColumChart, columnlabelChart, lineColumAreaChart,
  basicRadialBarChart, simplePieChart, donutChart, barChart, splineAreaChart, dashedLineChart,dumbbellTimelineCharts,funnelCharts,dumbbellcolumnCharts,rangeareaChart
} from './data';
import { StatsService } from 'src/app/shared/services/stats.service';

@Component({
  selector: 'app-apex',
  templateUrl: './apex.component.html',
  styleUrls: ['./apex.component.scss']
})

/**
 * Apex-chart component
 */
export class ApexComponent implements AfterViewInit {
    activityChart: any = {};
    private map: any;

    constructor(private statsService: StatsService) {}

    ngAfterViewInit() {
        this.initMap();
        this.loadActivity();
    }

    private initMap() {
        import('leaflet').then(L => {
            this.map = L.map('map').setView([33.8869, 10.1797], 6); // Centrer sur la Tunisie
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

            // Ajouter les marqueurs
            this.statsService.getIncidentsMap().subscribe(data => {
                data.forEach(incident => {
                    const marker = L.marker([parseFloat(incident.lat), parseFloat(incident.lng)])
                        .bindPopup(`<b>${incident.type}</b><br>${incident.description}`);
                    marker.addTo(this.map);
                });
            });
        });
    }

    loadActivity() {
        this.statsService.getGlobalActivity('month').subscribe(data => {
            this.activityChart = {
                series: [data.orders, data.deliveries, data.claims],
                chart: { type: 'donut', height: 300 },
                labels: ['Commandes', 'Livraisons', 'Réclamations'],
                colors: ['#4CAF50', '#2196F3', '#FF5722']
            };
        });
    }
}