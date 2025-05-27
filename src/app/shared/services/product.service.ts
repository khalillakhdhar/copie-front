import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/entities/product';
import { Page } from '../classes/entities/page';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://31.97.36.146:8080/api/produits';

  constructor(private http: HttpClient) {}

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/add-product`, product);
  }

  // Get all products with pagination
  getAllProducts(page: number, size: number): Observable<Page<Product>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Product>>(`${this.apiUrl}/all-products`, { params });
  }

  // Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/get-product/${id}`);
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-product/${id}`);
  }
  ///
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/by-category/${categoryId}`);
  }
  // Update an existing product
updateProduct(id: number, product: Product): Observable<Product> {
  return this.http.put<Product>(`${this.apiUrl}/update-product/${id}`, product);
}

}