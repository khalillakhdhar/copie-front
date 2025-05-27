import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/classes/entities/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent implements OnInit {
    products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  productForm!: FormGroup;
  selectedImageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isSaving = false;
  currentPage = 0;
  pageSize = 10;
  totalProducts = 0;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
    
    // Configuration de la recherche avec debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.applyFilter(searchTerm);
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      nomProduit: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      cassabilite: [false],
      quantiteEnStock: ['', [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required]
    });
  }

  loadProducts(): void {
    console.log('Chargement page:', this.currentPage);
    this.productService.getAllProducts(this.currentPage, this.pageSize).subscribe({
      next: (page) => {
        console.log('Produits reçus:', page);
        this.products = page.content;
        this.filteredProducts = [...this.products];
        this.totalProducts = page.totalElements;
        
        if (page.empty && this.currentPage > 0) {
          this.currentPage = page.totalPages - 1;
          this.loadProducts();
        }
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.toastr.error('Erreur lors du chargement des produits');
      }
    });
  }

  onPageChange(page: number): void {
    console.log('Changement page:', page);
    this.currentPage = page - 1;
    this.loadProducts();
  }

  // Méthode appelée lors de la frappe dans le champ de recherche
  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm.trim().toLowerCase());
  }

  // Méthode de filtrage des produits
  applyFilter(searchTerm?: string): void {
    const term = searchTerm || this.searchTerm.trim().toLowerCase();
    
    if (!term) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter(product => 
      product.nomProduit.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      (product.categorie?.nomCategorie?.toLowerCase().includes(term) || false)
    );
  }

  openEditModal(content: any, product: Product): void {
    this.selectedProduct = product;
    this.productForm.patchValue({
      nomProduit: product.nomProduit,
      description: product.description,
      prix: product.prix,
      cassabilite: product.cassabilite,
      quantiteEnStock: product.quantiteEnStock,
      categorie: product.categorie
    });

    if (product.image) {
      this.imagePreview = this.getProductImageUrl(product.image);
    } else {
      this.imagePreview = 'assets/images/default-product.png';
    }

    this.modalService.open(content, { size: 'lg' });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  getProductImageUrl(imagePath: string): string {
    return `http://31.97.36.146:8080/api/files/${imagePath}`;
  }

  saveProduct(): void {
    if (this.isSaving || !this.selectedProduct) return;
    
    this.isSaving = true;
    this.toastr.info('Enregistrement en cours...');

    if (this.selectedImageFile) {
      this.uploadImageAndUpdateProduct();
    } else {
      this.updateProductData();
    }
  }

  private uploadImageAndUpdateProduct(): void {
    if (!this.selectedImageFile || !this.selectedProduct) return;

    const oldImagePath = this.selectedProduct.image || undefined;
    
    this.fileUploadService.uploadImage(this.selectedImageFile, 'products', oldImagePath).subscribe({
      next: (res: any) => {
        if (res.success && res.filePath) {
          this.selectedProduct!.image = res.filePath;
          this.updateProductData();
        } else {
          this.handleError('Erreur lors du traitement de l\'image');
        }
      },
      error: (err) => {
        console.error('Image upload error', err);
        this.handleError('Échec de l\'upload de l\'image');
      }
    });
  }

  private updateProductData(): void {
    if (!this.selectedProduct) return;

    const updatedProduct: Product = {
      ...this.selectedProduct,
      ...this.productForm.value,
      image: this.selectedProduct.image
    };

    this.productService.updateProduct(this.selectedProduct.id!, updatedProduct).subscribe({
      next: () => {
        this.toastr.success('Produit mis à jour avec succès');
        this.modalService.dismissAll();
        this.loadProducts();
      },
      error: (err) => {
        console.error('Update error', err);
        this.handleError(err.error?.message || 'Erreur lors de la mise à jour');
      },
      complete: () => {
        this.isSaving = false;
        this.selectedImageFile = null;
      }
    });
  }

  confirmDelete(product: Product): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Voulez-vous vraiment supprimer "${product.nomProduit}" ? Cette action est irréversible!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(product.id!);
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        Swal.fire(
          'Supprimé!',
          'Le produit a été supprimé avec succès.',
          'success'
        );
        this.loadProducts();
      },
      error: (err) => {
        console.error('Erreur suppression:', err);
        Swal.fire(
          'Erreur!',
          'Une erreur est survenue lors de la suppression.',
          'error'
        );
      }
    });
  }

  private handleError(message: string): void {
    this.toastr.error(message);
    this.isSaving = false;
  }
}