import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../classes/entities/facture';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
   private apiUrl = 'http://31.97.36.146:8080/api/factures';
  constructor(private http: HttpClient) { }

  // Méthode pour générer une facture
  createFacture(commandeId: number, utilisateurId: number, montantTotal: number): Observable<Facture> {
    const factureData = {
      commandeId: commandeId,
      utilisateurId: utilisateurId,
      montantTotal: montantTotal
    };
    
    return this.http.post<Facture>(`${this.apiUrl}/create`,factureData);
    
  }
  //Méthode pour lister les facture d'un utilisateur connetcé
  getFacturesUtilisateur(page: number, size: number, sort: string = 'dateFacturation,desc'): Observable<any> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);

  return this.http.get<any>(`${this.apiUrl}/utilisateur`, { params });
}
//méthode pour récupérer une facture pour afficher ces détails
 getFactureById(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${id}`);
  }

}
