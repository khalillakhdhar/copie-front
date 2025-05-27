import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/classes/entities/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { CategoryService } from 'src/app/shared/services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { Category } from 'src/app/shared/classes/entities/category';
//import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})

/**
 * Ecommerce add-product component
 */

export class AddproductComponent implements OnInit {
  product: Product = {
    nomProduit: '',
    description: '',
    prix: null,
    cassabilite: true,
    quantiteEnStock: null,
    image: '', // sera rempli après upload
    categorie: {
      id: null,
      nomCategorie: '',
      description: '',
      produits: [],
      createdAt: "",
      updatedAt: ""
    },
    commandes: [],
    id: 0,
    createdAt: "",
    updatedAt: ""
  };

  submit: boolean = false;
  categories: Category[] = [];

  // Image actuelle du produit (chemin relatif à enregistrer)
  currentProductImage: string | undefined;
  //////////////////2eme methode upload image 
  selectedImageFile: File | null = null;//fichier image sélectionné par l'utilisateur
  imagePreview: string | ArrayBuffer | null = null;//URL de prévisualisation de l’image.

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private fileUploadService: FileUploadService // ← Service injecté
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories(0, 100).subscribe(
      (response) => {
        this.categories = response.content;
      },
      (error) => {
        console.error('Erreur de chargement des catégories', error);
        this.toastr.error('Erreur lors du chargement des catégories');
      }
    );
  }
  //Se déclenche à la sélection d’un fichier dans le champ <input type="file">
  //Prépare une prévisualisation via FileReader
  //Appelle uploadImage(...) pour uploader l’image immédiatement
onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    this.selectedImageFile = input.files[0];

    // Prévisualisation
    const reader = new FileReader();
    reader.onload = (e) => this.imagePreview = reader.result;
    reader.readAsDataURL(this.selectedImageFile);

    // Upload immédiat
    this.uploadImage(this.selectedImageFile);
  }
}
 
uploadImage(file: File): void {
  this.fileUploadService.uploadImage(file, 'products').subscribe({//utilise le service du back
    next: (res: any) => {
      if (res.success && res.filePath) {
        this.product.image = res.filePath; // ← chemin relatif (ex: "products/image.jpg")
        this.imagePreview = `http://localhost:8080/api/files/${res.filePath}`; //Met à jour la prévisualisation avec l’URL complète. (URL absolue à afficher)
        this.toastr.success('Image uploadée avec succès');
      } else {
        this.toastr.error('Réponse invalide lors de l\'upload');
      }
    },
    error: (err) => {
      console.error('Erreur upload image', err);
      this.toastr.error('Erreur lors de l\'upload de l\'image');
    }
  });
}


  validSubmit(): void {
    this.submit = true;

    if (!this.product.nomProduit || !this.product.prix || !this.product.quantiteEnStock || !this.product.categorie.id) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!this.product.image) {
      this.toastr.warning('Veuillez ajouter une image pour le produit');
      return;
    }

    this.productService.addProduct(this.product).subscribe(
      (response) => {
        this.toastr.success('Produit ajouté avec succès');
        this.router.navigate(['/ecommerce/editproduct']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit', error);
        this.toastr.error('Une erreur est survenue lors de l\'ajout du produit');
      }
    );
  }

  cancelSubmit(): void {
    this.router.navigate(['/ecommerce/products']);
  }

  
  
} 