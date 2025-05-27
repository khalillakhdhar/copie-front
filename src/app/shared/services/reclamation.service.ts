import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../classes/entities/reclamation';
import { Page } from '../classes/entities/page';
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
 private apiUrl = 'http://localhost:8080/api/reclamations'; 
 constructor(private http: HttpClient) {}
  // Send a new reclamation
  sendReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.apiUrl}/send`, reclamation);
  }

  // Get all reclamations with pagination
  getAllReclamations(page: number, size: number): Observable<Page<Reclamation>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Reclamation>>(`${this.apiUrl}/get-allclaim`, { params });
  }

  // Manage a reclamation by ID
  manageReclamation(reclamationId: number): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/claims/${reclamationId}`, {});
  }

  // Delete a reclamation by ID
  deleteReclamation(reclamationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-claim/${reclamationId}`);
  }


}
