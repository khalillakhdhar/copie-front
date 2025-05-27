import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../classes/entities/page';
@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private adminApiUrl = '/api/admin/livraisons';
  private livreurApiUrl = '/api/livreurs';

  constructor(private http: HttpClient) { }
  
  // Méthodes pour l'admin
  getLivreursDisponibles(page: number, size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<any>>(`${this.adminApiUrl}/livreurs-disponibles`, { params });
  }

  attribuerCommandeALivreur(commandeId: number, livreurId: number): Observable<any> {
    return this.http.post<any>(
      `${this.adminApiUrl}/attribuer/${commandeId}/${livreurId}`, 
      {}
    );
  }

  consulterTousRapports(page: number, size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<any>>(`${this.adminApiUrl}/rapports`, { params });
  }

  consulterRapport(rapportId: number): Observable<any> {
    return this.http.get<any>(`${this.adminApiUrl}/rapports/${rapportId}`);
  }
  // Méthodes pour les livreurs
  getCommandesAttribuees(livreurId: number, page: number, size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<any>>(`${this.livreurApiUrl}/commandes/${livreurId}`, { params });
  }

  accepterCommande(livraisonId: number): Observable<any> {
    return this.http.post<any>(`${this.livreurApiUrl}/accepter/${livraisonId}`, {});
  }

  refuserCommande(livraisonId: number, motif: string): Observable<any> {
    return this.http.post<any>(`${this.livreurApiUrl}/refuser/${livraisonId}`, { motif });
  }

  mettreAJourStatutLivraison(livraisonId: number, statut: string): Observable<any> {
    return this.http.put<any>(`${this.livreurApiUrl}/statut/${livraisonId}/${statut}`, {});
  }

  getRapportsByLivreur(livreurId: number, page: number, size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<any>>(`${this.livreurApiUrl}/rapports/${livreurId}`, { params });
  }









}
