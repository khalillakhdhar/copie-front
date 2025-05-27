import { Component, OnInit, TemplateRef } from '@angular/core';
import { Category } from 'src/app/shared/classes/entities/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/shared/services/category.service';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category-pages',
  templateUrl: './category-pages.component.html',
  styleUrls: ['./category-pages.component.css']
})
export class CategoryPagesComponent 
implements OnInit {
  categories: Category[] = [];
  categorieForm!: FormGroup;
  isEditMode = false;
  modalRef?: BsModalRef;
  selectedCategoryId!: number;

  page = 1; // La page actuelle
  itemsPerPage = 5; // Nombre d'éléments par page
  totalElements = 0; // Nombre total d'éléments
  totalPages = 0; // Nombre total de pages (calculé à partir des éléments totaux)


  breadCrumbItems = [{ label: 'Administration' }, { label: 'Catégories', active: true }];

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm(): void {
    this.categorieForm = this.fb.group({
      id: [null],
      nomCategorie: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getCategories(): void {
    this.categoryService.getAllCategories(this.page - 1, this.itemsPerPage).subscribe({
      next: (data) => {
        this.categories = data.content; // Liste des catégories
        this.totalElements = data.totalElements; // Total des éléments
        this.totalPages = Math.ceil(this.totalElements / this.itemsPerPage); // Calcul des pages totales
      },
      error: (err) => console.error('Erreur de chargement des catégories :', err),
    });
  }

  pageChanged(event: number): void {
    this.page = event;
    this.getCategories();
  }

  openModal(content: TemplateRef<any>): void {
    this.isEditMode = false;
    this.categorieForm.reset();
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  editCategory(category: Category, content: TemplateRef<any>): void {
    this.isEditMode = true;
    this.categorieForm.patchValue(category);
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  saveCategory(): void {
    if (this.categorieForm.invalid) return;

    const category = this.categorieForm.value;

    if (this.isEditMode && category.id) {
      this.categoryService.updateCategory(category.id, category).subscribe({
        next: () => {
          this.modalRef?.hide();
          this.getCategories();
        },
        error: (err) => console.error('Erreur lors de la mise à jour :', err),
      });
    } else {
      this.categoryService.ajouterCategorie(category).subscribe({
        next: () => {
          this.modalRef?.hide();
          this.getCategories();
        },
        error: (err) => console.error('Erreur lors de l\'ajout :', err),
      });
    }
  }

  confirmDelete(id: number, template: TemplateRef<any>): void {
    this.selectedCategoryId = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment supprimer cette catégorie?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.supprimerCategorie(id).subscribe({
          next: () => {
            Swal.fire(
              'Supprimé!',
              'La catégorie a été supprimée.',
              'success'
            );
            this.getCategories(); // Rafraîchir la liste
          },
          error: (err) => {
            let errorMessage = 'Une erreur est survenue';
            
            if (err.status === 500 && err.error.includes("foreign key constraint")) {
              errorMessage = 'Impossible de supprimer : cette catégorie contient des produits';
            } else if (err.status === 404) {
              errorMessage = 'Catégorie non trouvée';
            }
  
            Swal.fire('Erreur', errorMessage, 'error');
          }
        });
      }
    });
  }
}