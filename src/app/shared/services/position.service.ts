import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '../classes/entities/position';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private apiUrl = 'http://localhost:8080/api/positions';

  constructor(private http: HttpClient) {}

  // Ajouter une position (livreur)
  createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(this.apiUrl, position);
  }

  // Récupérer la dernière position d’un livreur (client, admin)
  getLastPositionByLivreurId(livreurId: number): Observable<Position> {
    return this.http.get<Position>(`${this.apiUrl}/livreur/${livreurId}/last`);
  }

  // Récupérer toutes les positions d’un livreur (optionnel, admin)
  getAllPositionsByLivreurId(livreurId: number): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiUrl}/livreur/${livreurId}`);
  }

}