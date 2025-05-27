import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../classes/entities/category';
import { Page } from '../classes/entities/page';
import { Product } from '../classes/entities/product';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://31.97.36.146:8080/api/categories';

  constructor(private http: HttpClient) {}

  // Add a new category
  ajouterCategorie(categorie: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/add-category`, categorie);
  }

  // Get all categories with pagination
  getAllCategories(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all-categories?page=${page}&size=${size}`);
  }

  // Get category by ID
  getCategorieById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/get-category/${id}`);
  }
  // Mettre à jour une catégorie
  updateCategory(id: number, categorie: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/update-category/${id}`, categorie);
  }
  
  // Supprimer une catégorie
  supprimerCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-category/${id}`);
  }
  // Récupérer les produits d’une catégorie avec pagination
  getProduitsByCategorie(id: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/produits?page=${page}&size=${size}`);
  }


}