import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Page } from '../classes/entities/page';
import { Supplier } from '../classes/entities/supplier';
import { Delivery } from '../classes/entities/delivery';
import { LivreurUpdate } from '../classes/entities/livreur-update';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:8080/api/livreurs';

  constructor(private http: HttpClient) {}

  // Create a new supplier
  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.apiUrl}/create-supplier`, supplier);
  }

  // Update an existing supplier
  updateSupplier(id: number, update: LivreurUpdate): Observable<Supplier> {
    return this.http.patch<Supplier>(`${this.apiUrl}/update-supplier/${id}`, update)
      .pipe(catchError(this.handleError));
  }

  // Delete a supplier by ID
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-supplier/${id}`);
  }

  // Get supplier by ID
  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/getsupplier/${id}`);
  }

  // Get all suppliers with pagination
  getSuppliersPaginated(page: number = 0, size: number = 10): Observable<Page<Supplier>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Supplier>>(`${this.apiUrl}/getAllSupplier`, { params });
  }
  //available supplier
  getAvailableSuppliers(page: number = 0, size: number = 10): Observable<Page<Supplier>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Supplier>>(`${this.apiUrl}/disponibles`, { params });
  }
  

 
  private handleError(error: any) {
    console.error('SupplierService Error:', error);
    return throwError(() => new Error(
      error.error?.message || 'Server error'
    ));
  }
}
