import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { productModel, productList } from '../../product.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Product } from 'src/app/shared/classes/entities/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/shared/services/cart.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/shared/classes/entities/cartItem';
const BASE_FILE_URL = 'http://31.97.36.146:8080/api/files/';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})

/**
 * Ecommerce product-detail component
 */
export class ProductdetailComponent implements OnInit {
 
  productDetail!: Product;
  tabs: { image: string }[] = [];
  image: string | string[];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true
  };
  

  breadCrumbItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Produits', path: '/ecommerce/products' },
    { label: 'Détails', active: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private cartService: CartService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }
  }
  
  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.productDetail = product;
        this.tabs = this.prepareImageTabs(product);
      },
      error: err => {
        console.error('Erreur lors du chargement du produit :', err);
      }
    });
  }

 prepareImageTabs(product: Product): { image: string }[] {
  const images: string[] = [];

  // Vérification si product.image est une chaîne de caractères ou un tableau de chaînes
  if (typeof product.image === 'string') {
    images.push(product.image);  // Si c'est une chaîne, on l'ajoute directement
  } else if (Array.isArray(product.image)) {
    // Ici, TypeScript sait que product.image est un tableau, donc on peut étendre
    images.push(...product.image as string[]);  // Assurez-vous que TypeScript comprend que c'est un tableau de chaînes
  } else {
    console.error('Format d\'image invalide pour le produit :', product);
    return [];  // Retourne un tableau vide si l'image n'est ni une chaîne ni un tableau
  }

  return images.map(img => ({ image: img }));
}

  

addToCart() {
  if (this.productDetail && this.productDetail.quantiteEnStock > 0) {
    const firstImage = Array.isArray(this.productDetail.image)
      ? this.productDetail.image[0]
      : this.productDetail.image;

    //const imageUrl = BASE_FILE_URL + firstImage;
    const imageUrl = `http://31.97.36.146:8080/api/files/${firstImage}`;

    this.cartService.addToCart({
      id: this.productDetail.id,
      name: this.productDetail.nomProduit,
      price: this.productDetail.prix,
      image: imageUrl,  // ✅ lien complet vers l’image
      qty: 1,
      total: this.productDetail.prix,
      stock: this.productDetail.quantiteEnStock
    });

    this.router.navigate(['/ecommerce/cart']);
  } else {
    this.toastr.warning('Produit indisponible');
  }
}

  buyNow() {
    if (this.productDetail && this.productDetail.quantiteEnStock > 0) {
      const firstImage = Array.isArray(this.productDetail.image)
        ? this.productDetail.image[0]
        : this.productDetail.image;
  
      //const imageUrl = BASE_FILE_URL + firstImage;
      const imageUrl = `http://31.97.36.146:8080/api/files/${firstImage}`;
  
    // Convertir le produit en item de panier
    const cartItem: CartItem = {
      id: this.productDetail.id,
      name: this.productDetail.nomProduit,
      price: this.productDetail.prix,
      image: imageUrl, // ou la première image de tabs[0].image
      qty: 1,
      total: this.productDetail.prix,
      stock: this.productDetail.quantiteEnStock
      // autres propriétés nécessaires
    };
  
    // Utiliser la nouvelle méthode d'achat immédiat
    this.cartService.immediatePurchase(cartItem);
    
    // Rediriger vers le checkout
    this.router.navigate(['/ecommerce/checkout']);
  }}
  
}
