import { Component, OnInit } from '@angular/core';
import { Options } from 'ngx-slider-v2';
import { Product } from 'src/app/shared/classes/entities/product';
import { Category } from 'src/app/shared/classes/entities/category';
import { Page } from 'src/app/shared/classes/entities/page';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  breadCrumbItems = [
    { label: 'Ecommerce', active: true },
    { label: 'Produits', active: true }
  ];

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];

  selectedCategoryId: number | null = null;
  searchTerm: string = '';
  priceRange = { min: 0, max: 1000 };
  priceValues = [0, 1000];

  currentPage = 0;
  pageSize = 12;
  totalElements = 0;
  loadingMore = false;
  hasMoreProducts = true;
  isLoading = false;

  priceSliderOptions: Options = {
    floor: 0,
    ceil: 1000,
    step: 10,
    translate: (value: number): string => `${value} TND`
  };

  get selectedCategoryName() {
    const category = this.categories.find(c => c.id === this.selectedCategoryId);
    return category ? category.nomCategorie : null;
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/product-default.png';
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getAllCategories(0, 100).subscribe({
      next: (page: Page<Category>) => {
        this.categories = page.content;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des catégories', err);
        this.toastr.error('Erreur lors du chargement des catégories');
        this.isLoading = false;
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Product>) => {
        this.allProducts = [...this.allProducts, ...page.content];
        this.totalElements = page.totalElements;
        this.hasMoreProducts = !page.last;
        this.isLoading = false;

        if (this.allProducts.length > 0) {
          this.calculatePriceRange();
        }

        this.applyFilters(); // appliquer les filtres automatiquement
      },
      error: (err) => {
        console.error('Erreur de chargement des produits', err);
        this.toastr.error('Erreur lors du chargement des produits');
        this.isLoading = false;
      }
    });
  }

  calculatePriceRange(): void {
    const prices = this.allProducts.map(p => p.prix);
    this.priceRange.min = Math.min(...prices);
    this.priceRange.max = Math.max(...prices);
    this.priceValues = [this.priceRange.min, this.priceRange.max];

    this.priceSliderOptions = {
      ...this.priceSliderOptions,
      floor: this.priceRange.min,
      ceil: this.priceRange.max
    };
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }

  onPriceChange(values: number[]): void {
    this.priceValues = values;
    this.applyFilters();
  }

  searchProducts(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.allProducts.filter(product => {
      const categoryMatch = this.selectedCategoryId
        ? product.categorie?.id === this.selectedCategoryId
        : true;

      const priceMatch = product.prix >= this.priceValues[0] && product.prix <= this.priceValues[1];

      const searchMatch = !this.searchTerm ||
        product.nomProduit.toLowerCase().includes(this.searchTerm) ||
        (product.description && product.description.toLowerCase().includes(this.searchTerm));

      return categoryMatch && priceMatch && searchMatch;
    });
  }

  resetFilters(): void {
    this.selectedCategoryId = null;
    this.searchTerm = '';
    this.priceValues = [this.priceRange.min, this.priceRange.max];
    this.applyFilters();
  }

  loadMoreProducts(): void {
    if (this.loadingMore || !this.hasMoreProducts) return;

    this.loadingMore = true;
    this.currentPage++;

    this.productService.getAllProducts(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Product>) => {
        this.allProducts = [...this.allProducts, ...page.content];
        this.hasMoreProducts = !page.last;
        this.loadingMore = false;

        this.applyFilters(); // re-filtrer les nouveaux produits
      },
      error: (err) => {
        console.error('Erreur de chargement supplémentaire', err);
        this.toastr.error('Erreur lors du chargement de plus de produits');
        this.loadingMore = false;
      }
    });
  }

  
}
