import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../classes/entities/page';
import { Observable } from 'rxjs';
import { AccidentResponse } from '../classes/entities/accidentResponse';
@Injectable({
  providedIn: 'root'
})
export class AccidentService {
   private apiUrl = 'http://31.97.36.146:8080/api/accidents'; // URL de base API backend (à adapter)

  constructor(private http: HttpClient) { }

  // Signalement d'un accident (livreur)
 signalerAccident(accident: any, livreurId: number): Observable<AccidentResponse> {
  const params = new HttpParams().set('livreurId', livreurId.toString());
  return this.http.post<AccidentResponse>(this.apiUrl, accident, { params });
}


  // Récupérer la liste des accidents signalés (admin)
  getAccidents(): Observable<AccidentResponse[]> {
    return this.http.get<AccidentResponse[]>(this.apiUrl);
  }

}
