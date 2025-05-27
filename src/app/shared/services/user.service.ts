import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../classes/entities/user';
import { LoginResponse } from '../classes/LoginResponse';
import { Page } from '../classes/entities/page';
import { Adresse } from '../classes/entities/adresse';
import { LoginRequest } from '../classes/entities/loginRequest';
import { tap } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/utilisateurs'; 
  constructor(private http: HttpClient) {}
  
   // pour le stovkage du token apres authentification
   login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('roles', JSON.stringify(response.roles));
          localStorage.setItem('userId', response.userId); 
          localStorage.setItem('email', response.email);
        }
      })
    );
  }
  
  logout(): void {
    //localStorage.removeItem('token');
    localStorage.clear();
  }


  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Get all users with pagination
  getAllUsers(page: number, size: number): Observable<Page<User>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<User>>(`${this.apiUrl}/getUsers`, { params });
  }

  // Get user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUser/${id}`);
  }

  // Update user
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update-user/${id}`, user);
  }

  // Delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update user password
  updatePassword(id: number, password: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/update-password`, { motDePasse: password });
  }

  // Add user address
  addAddress(userId: number, address: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/adresse`, address);
  }

  // Add user profile
  addProfile(userId: number, profile: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/profile`, profile);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  // Méthode pour compléter la réinitialisation
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, {
      token,
      newPassword
    });
  }



}
