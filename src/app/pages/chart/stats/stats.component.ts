import { Component ,OnInit} from '@angular/core';
import { StatsService } from 'src/app/shared/services/stats.service';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent  implements OnInit {
  newUsersChart: any = {};
  topProductsChart: any = {};

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadNewUsersStats();
    this.loadTopProducts();
  }

  loadNewUsersStats() {
    this.statsService.getNewUsersByMonth().subscribe(data => {
      this.newUsersChart = {
        series: [{ name: "Inscriptions", data: Object.values(data) }],
        chart: { type: 'line', height: 350 },
        xaxis: { categories: Object.keys(data) }
      };
    });
  }

  loadTopProducts() {
    this.statsService.getTopProducts(5).subscribe(data => {
      this.topProductsChart = {
        series: data.map(item => item.sales),
        chart: { type: 'pie', height: 350 },
        labels: data.map(item => item.name)
      };
    });
  }
  ////////////////
  
}