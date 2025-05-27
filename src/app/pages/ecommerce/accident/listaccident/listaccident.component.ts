import { Component ,OnInit} from '@angular/core';
import { AccidentService } from 'src/app/shared/services/accident.service';
import { AccidentResponse } from 'src/app/shared/classes/entities/accidentResponse';
import { Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Page } from 'src/app/shared/classes/entities/page';
@Component({
  selector: 'app-listaccident',
  templateUrl: './listaccident.component.html',
  styleUrl: './listaccident.component.css'
})
export class ListaccidentComponent  implements OnInit {
   breadCrumbItems = [
    { label: 'Liste des accident', active: true }
  ];
  searchTerm: string = '';
accidents: AccidentResponse[] = [];
filteredAccidents: AccidentResponse[] = [];

  constructor(private accidentService: AccidentService,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.loadAccidents();
  }

  loadAccidents() {
    this.accidentService.getAccidents().subscribe(data => {
    this.accidents = data;
    this.filteredAccidents = data;
   });
}
filterAccidents() {
  const term = this.searchTerm.toLowerCase();
  this.filteredAccidents = this.accidents.filter(a =>
    a.livreurName.toLowerCase().includes(term) ||
    a.severity.toLowerCase().includes(term) ||
    a.latitude.toString().includes(term) ||
    a.longitude.toString().includes(term)
  );
}
getSeverityClass(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'legere':
      return 'badge bg-success';
    case 'moyenne':
      return 'badge bg-warning text-dark';
    case 'grave':
      return 'badge bg-danger';
    default:
      return 'badge bg-secondary';
  }
}


goToAccidentMap() {
  this.router.navigate(['/ecommerce/accidentMap']);
}
}