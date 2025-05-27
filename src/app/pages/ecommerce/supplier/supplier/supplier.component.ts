import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { Supplier } from 'src/app/shared/classes/entities/supplier';
import { Page } from 'src/app/shared/classes/entities/page';
import { Vehicle } from 'src/app/shared/classes/enums/vehicle.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LivreurUpdate } from 'src/app/shared/classes/entities/livreur-update';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  @ViewChild('addModal') addModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  breadCrumbItems = [
    { label: 'Gestion Livreurs', active: true }
  ];
  p:number=1;
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  searchTerm = '';
  currentSupplierId: number | null = null;
  
  vehicleTypes = Object.values(Vehicle);
  
  addForm: FormGroup;
  editForm: FormGroup;

  
  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private modalService: NgbModal,
    private toast :ToastrService
  ) {
    this.addForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      vehicule: [Vehicle.Voiture, Validators.required],
      immatriculation: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      vehicule: [null],
      immatriculation: [''],
      actif: [true],
      disponible: [true]
    });
  }


  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliersPaginated().subscribe({
      next: (page) => {
        this.suppliers = page.content;
        this.filteredSuppliers = [...this.suppliers];
      },
      error: (err) => console.error('Erreur chargement livreurs:', err)
    });
  }

  filterSuppliers(): void {
    if (!this.searchTerm) {
      this.filteredSuppliers = [...this.suppliers];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredSuppliers = this.suppliers.filter(s => 
      s.nom.toLowerCase().includes(term) || 
      s.prenom.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term) ||
      s.telephone.toLowerCase().includes(term) ||
      s.immatriculation.toLowerCase().includes(term)
    );
  }

  openAddModal(): void {
    this.addForm.reset({
      vehicule: Vehicle.Voiture
    });
    this.modalService.open(this.addModal, { size: 'lg', centered: true });
  }

  openEditModal(supplier: Supplier): void {
    this.currentSupplierId = supplier.id;
    this.editForm.patchValue({
      vehicule: supplier.vehicule,
      immatriculation: supplier.immatriculation,
      actif: supplier.actif,
      disponible: supplier.disponible
    });
    this.modalService.open(this.editModal, { centered: true });
  }

  createSupplier(): void {
    if (this.addForm.invalid) return;
    
    this.supplierService.createSupplier(this.addForm.value as Supplier)
      .subscribe({
        next: () => {
          this.loadSuppliers();
          this.modalService.dismissAll();
          this.toast.success('Livreur ajouté avec succès');

        },
        error: (err) => {
          console.error('Erreur création:', err);
          // Toastr.error('Erreur lors de la création');
        }
      });
  }

  updateSupplier(): void {
    if (!this.currentSupplierId) return;
    
    const updateData: LivreurUpdate = this.editForm.value;
    
    this.supplierService.updateSupplier(this.currentSupplierId, updateData)
      .subscribe({
        next: () => {
          this.loadSuppliers();
          this.modalService.dismissAll();
          // Toastr.success('Mise à jour réussie');
        },
        error: (err) => {
          console.error('Erreur mise à jour:', err);
          // Toastr.error('Erreur lors de la mise à jour');
        }
      });
  }

  confirmDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?')) {
      this.supplierService.deleteSupplier(id)
        .subscribe({
          next: () => {
            this.loadSuppliers();
            // Toastr.success('Livreur supprimé');
          },
          error: (err) => {
            console.error('Erreur suppression:', err);
            // Toastr.error('Erreur lors de la suppression');
          }
        });
    }
  }
  
}