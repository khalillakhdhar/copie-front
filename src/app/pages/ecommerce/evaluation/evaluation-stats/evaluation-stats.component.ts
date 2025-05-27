import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import { EvaluationService } from 'src/app/shared/services/evaluation.service';
import { EvaluationResponseDTO } from '../../../../shared/classes/entities/EvaluationResponseDTO';

export type ChartOptions = {
  series: ApexAxisChartSeries | number[];
  chart: ApexChart;
  xaxis?: ApexXAxis;
  title: ApexTitleSubtitle;
  labels?: string[];
};
@Component({
  selector: 'app-evaluation-stats',
  templateUrl: './evaluation-stats.component.html',
  styleUrl: './evaluation-stats.component.css'
})
export class EvaluationStatsComponent implements OnInit {

  chartOptions!: Partial<ChartOptions>;
  pieChartOptions!: Partial<ChartOptions>;

  loading = true;

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit(): void {
    this.evaluationService.getAllEvaluations().subscribe(data => {
       console.log('Évaluations reçues:', data);
      const noteCounts = [0, 0, 0, 0, 0]; // index 0 -> note 1, index 4 -> note 5

      data.forEach(e => {
        if (e.note >= 1 && e.note <= 5) {
          noteCounts[e.note - 1]++;
        }
      });
      this.pieChartOptions = {
  series: noteCounts,
  chart: {
    type: "pie",
    height: 350
  },
  labels: ["1 étoile", "2 étoiles", "3 étoiles", "4 étoiles", "5 étoiles"],
  title: {
    text: "Répartition des notes (camembert)"
  }
};


      this.chartOptions = {
        series: [{
          name: "Nombre d’évaluations",
          data: noteCounts
        }],
        chart: {
          type: "bar",
          height: 350
        },
        title: {
          text: "Répartition des notes"
        },
        xaxis: {
          categories: ["1 étoile", "2 étoiles", "3 étoiles", "4 étoiles", "5 étoiles"]
        }
      };

      this.loading = false;
    });
  }
  
}