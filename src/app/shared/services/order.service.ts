import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Page } from '../classes/entities/page';
import { Order } from '../classes/entities/order';
import { CommandeRequestDTO } from '../classes/entities/commandeRequestDTO ';
import { TypeOrder } from '../classes/enums/typeOrder.enum';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://31.97.36.146:8080/api/commandes';

  constructor(private http: HttpClient) {}
  createOrder(commandeRequest: CommandeRequestDTO): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}`, commandeRequest)
  }
  
  // Obtenir toutes les commandes (avec pagination)
  getAllOrders(page: number, size: number): Observable<Page<Order>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Order>>(`${this.apiUrl}`, { params });
  }
  
  // Obtenir une commande par son ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
  

  // Mettre à jour une commande
  updateOrderStatus(id: number, etatCommande: string): Observable<Order> {
    const params = new HttpParams().set('etatCommande', etatCommande);
    return this.http.put<Order>(`${this.apiUrl}/${id}/etat`, null, { params });
  }
  

  assignLivreur(id: number, livreurId: number): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}/assign-livreur/${livreurId}`, null);
  }
  
  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getCommandesEnCours(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/en-cours`);
  }
  getCommandesConfirmée(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/confirmée`);
  }
  

  
}