import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8080/auth'; 

  constructor(private http: HttpClient) { }

  sendPasswordResetEmail(email: string, token: string): Observable<any> {
    const body = { email, token };
    return this.http.post(`${this.apiUrl}/send-password-reset-email`, body);
  }
}
