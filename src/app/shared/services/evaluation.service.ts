import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvaluationRequestDTO } from '../classes/entities/EvaluationRequestDTO';
import { EvaluationResponseDTO } from '../classes/entities/EvaluationResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
private baseUrl = 'http://31.97.36.146:8080/api/evaluations';

  constructor(private http: HttpClient) {}

  createEvaluation(evaluation: EvaluationRequestDTO, utilisateurId: number): Observable<EvaluationResponseDTO> {
    return this.http.post<EvaluationResponseDTO>(`${this.baseUrl}/${utilisateurId}`, evaluation);
  }

  getAllEvaluations(): Observable<EvaluationResponseDTO[]> {
    return this.http.get<EvaluationResponseDTO[]>(this.baseUrl);
  }

  getEvaluationsByUtilisateur(utilisateurId: number): Observable<EvaluationResponseDTO[]> {
    return this.http.get<EvaluationResponseDTO[]>(`${this.baseUrl}/user/${utilisateurId}`);
  }
}