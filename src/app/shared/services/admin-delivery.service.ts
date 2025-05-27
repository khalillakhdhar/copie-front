import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../classes/entities/page';
import { Delivery } from '../classes/entities/delivery';
import { Supplier } from '../classes/entities/supplier';
@Injectable({
  providedIn: 'root'
})
export class AdminDeliveryService {

  private apiUrl = 'http://localhost:8080/api/admin/livraisons';

  constructor(private http: HttpClient) {}

  // Get available delivery persons
  getLivreursDisponibles(page: number, size: number): Observable<Page<Supplier>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Supplier>>(`${this.apiUrl}/livreurs-disponibles`, { params });
  }

  // Assign an order to a delivery person
  attribuerCommandeALivreur(commandeId: number, livreurId: number): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}/attribuer-commande`, null, {
      params: {
        commandeId: commandeId.toString(),
        livreurId: livreurId.toString()
      }
    });
  }
}
