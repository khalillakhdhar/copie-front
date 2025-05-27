import { Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { addCustomerlist, fetchCustomerData, updateCustomerlist } from 'src/app/store/customer/customer.action';
import { selectData } from 'src/app/store/customer/customer-selector';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/classes/entities/user';
import { Adresse } from 'src/app/shared/classes/entities/adresse';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Page } from 'src/app/shared/classes/entities/page';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [DecimalPipe]
})

/**
 * Ecomerce Customers component
 */export class CustomersComponent implements OnInit {
  clients: User[] = [];
  clientForm!: FormGroup;
  isEditMode = false;
  modalRef?: BsModalRef;
  selectedClientId!: number;

  page = 1;
  itemsPerPage = 5;
  totalElements = 0;
  totalPages = 0; // Déclaration de totalPages
  currentPage: number = 1;


  breadCrumbItems = [{ label: 'Administration' }, { label: 'Clients', active: true }];
  searchTerm: string='';

  constructor(
    private userService: UserService,  // Injection du UserService
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getClients();
  }

  // Initialiser le formulaire de gestion des utilisateurs
  initForm(): void {
    this.clientForm = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: this.fb.group({
        rue: ['', Validators.required],
        ville: ['', Validators.required],
        province: ['', Validators.required],
        codePostale: ['', Validators.required],
      }),
    });
  }

  // Récupérer les utilisateurs avec pagination
  getClients(): void {
    this.userService.getAllUsers(this.page - 1, this.itemsPerPage).subscribe({
      next: (data) => {
        console.log(data);
          this.clients = data.content; // Liste des utilisateurs sur la page actuelle
      this.totalElements = data.totalElements; // Nombre total d'utilisateurs dans la base
      this.totalPages = data.totalPages; // Nombre total de pages
      },
      error: (err) => console.error('Erreur de chargement des utilisateurs :', err),
    });
  }

  // Changement de page pour la pagination
  pageChanged(event: number): void {
    this.page = event;
    this.getClients();
  }

  // Ouvrir le modal pour ajouter ou éditer un client
  openModal(content: TemplateRef<any>): void {
    this.isEditMode = false;
    this.clientForm.reset();
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  // Ouvrir le modal en mode édition avec les informations du client
  editClient(client: User, content: TemplateRef<any>): void {
    this.isEditMode = true;
    this.clientForm.patchValue(client);
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  // Sauvegarder un client (ajout ou mise à jour)
  saveClient(): void {
    if (this.clientForm.invalid) return;

    const client = this.clientForm.value;

    if (this.isEditMode && client.id) {
      this.userService.updateUser(client.id, client).subscribe({
        next: () => {
          this.modalRef?.hide();
          this.getClients();
        },
        error: (err) => console.error('Erreur lors de la mise à jour :', err),
      });
    } else {
      this.userService.register(client).subscribe({
        next: () => {
          this.modalRef?.hide();
          this.getClients();
        },
        error: (err) => console.error('Erreur lors de l\'ajout :', err),
      });
    }
  }

  // Ouvrir le modal de confirmation de suppression
  confirmDelete(id: number, template: TemplateRef<any>): void {
    this.selectedClientId = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  // Supprimer un client
  deleteClient(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment supprimer ce client?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'Le client a été supprimé.', 'success');
            this.getClients();  // Rafraîchir la liste des clients
          },
          error: (err) => {
            let errorMessage = 'Une erreur est survenue';
            
            if (err.status === 500 && err.error.includes("foreign key constraint")) {
              errorMessage = 'Impossible de supprimer : ce client contient des commandes ou des livraisons';
            } else if (err.status === 404) {
              errorMessage = 'Client non trouvé';
            }

            Swal.fire('Erreur', errorMessage, 'error');
          }
        });
      }
    });
  }
  
searchCustomers(event: Event): void {
  const value = (event.target as HTMLInputElement).value.toLowerCase();
  this.searchTerm = value;

  if (!value) {
    this.getClients(); // recharge les données initiales si recherche vide
    return;
  }

  this.userService.getAllUsers(0, this.totalElements).subscribe({
    next: (data) => {
      this.clients = data.content.filter((client: User) =>
        client.nom.toLowerCase().includes(value) ||
        client.prenom.toLowerCase().includes(value) ||
        client.email.toLowerCase().includes(value) ||
        client.telephone.toLowerCase().includes(value)
      );
    },
    error: (err) => console.error('Erreur de recherche :', err),
  });
}

  
}