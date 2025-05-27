import { Component ,OnInit,ViewChild} from '@angular/core';
import { Reclamation } from 'src/app/shared/classes/entities/reclamation';
import { BsModalService, BsModalRef, ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import{addComplaintList,deleteComplaintList,updateComplaintList}from 'src/app/store/ComplaintList/complaintlist.action';
import { Page } from 'src/app/shared/classes/entities/page';
import { ReclamationService } from 'src/app/shared/services/reclamation.service';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { from } from 'rxjs';
import { TypeReclamation } from 'src/app/shared/classes/enums/typeReclamation.enum';
@Component({
  selector: 'app-listcomplaints',
  templateUrl: './listcomplaints.component.html',
  styleUrl: './listcomplaints.component.css'
})
export class ListcomplaintsComponent implements OnInit{
  reclamations: Reclamation[] = [];
  filteredReclamations: Reclamation[] = [];
  searchTerm: string = ''; // Termes de recherche pour filtrer par texte
  typeReclamationFilter: string = ''; // Filtrage par type de réclamation
  typeReclamationEnum = TypeReclamation; // Enum des types de réclamation
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  modalRef: BsModalRef | undefined; // Référence du modal
  selectedReclamation: Reclamation | undefined; // Réclamation sélectionnée pour afficher les détails
breadCrumbItems: any;

  constructor(private reclamationService: ReclamationService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.loadReclamations(this.currentPage);
  }

  // Récupère les réclamations avec la pagination
  loadReclamations(page: number): void {
    this.reclamationService.getAllReclamations(page, this.pageSize).subscribe({
      next: (res) => {
        this.reclamations = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
        this.filterReclamations();  // Applique le filtrage dès le chargement
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réclamations :', err);
      },
    });
  }

  // Applique les filtres sur la liste des réclamations
  filterReclamations(): void {
    let filtered = this.reclamations;

    // Filtrage par type de réclamation
    if (this.typeReclamationFilter) {
      filtered = filtered.filter(reclamation =>
        reclamation.typeReclamation === this.typeReclamationFilter
      );
    }

    this.filteredReclamations = filtered;
  }

  // Changer la page de la pagination
  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadReclamations(page);
    }
  }

  // Affiche les détails de la réclamation dans un modal
  viewDetails(template: any, reclamation: Reclamation): void {
    this.selectedReclamation = reclamation;
    this.modalRef = this.modalService.show(template);
  }

  // Supprime une réclamation après confirmation avec SweetAlert
  deleteReclamation(id: number | undefined): void {
    if (id) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Cette réclamation sera supprimée définitivement.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.reclamationService.deleteReclamation(id).subscribe({
            next: () => {
              this.loadReclamations(this.currentPage);  // Recharge les réclamations après suppression
              Swal.fire('Supprimée!', 'La réclamation a été supprimée.', 'success');
            },
            error: (err) => {
              console.error('Erreur lors de la suppression :', err);
              Swal.fire('Erreur!', 'La réclamation n\'a pas pu être supprimée.', 'error');
            }
          });
        }
      });
    }
  }

  // Change le filtre par type de réclamation
  onTypeFilterChange(event: any): void {
    this.typeReclamationFilter = event.target.value;
    this.filterReclamations();  // Applique le filtre chaque fois qu'un type est sélectionné
  }
}