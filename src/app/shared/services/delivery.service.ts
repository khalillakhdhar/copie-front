import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../classes/entities/delivery';
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private baseUrl = 'http://localhost:8080/api/livraisons';

  constructor(private http: HttpClient) {}

  // Récupérer les livraisons en attente pour un livreur donné
  getLivraisonsEnAttenteByLivreur(livreurId: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.baseUrl}/livreur/${livreurId}/en-attente`);
  }

  // Accepter ou refuser une livraison
  traiterLivraison(livraisonId: number, acceptee: boolean): Observable<any> {
    return this.http.put(`${this.baseUrl}/${livraisonId}/traiter`, null, {
      params: { acceptee: acceptee.toString() }
    });
  }
  // Récupérer la livraison attribuée à une commande (pour le client)
  getLivraisonAttribueeParCommande(commandeId: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.baseUrl}/commande/${commandeId}/attribuee`);
  }

}

