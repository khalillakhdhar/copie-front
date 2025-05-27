import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    // Initialiser avec l'utilisateur du localStorage si existant
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.userService.login({ email, password }).pipe(
      map(response => {
        if (response && response.token) {
          const user = {
            id: response.userId,
            email: response.email,
            roles: response.roles,
            token: response.token
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(user);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.roles && user.roles.includes('Administrateur');
  }

  isLivreur(): boolean {
    const user = this.getCurrentUser();
    return user && user.roles && user.roles.includes('Livreur');
  }
  isClient(): boolean {
    const user = this.getCurrentUser();
    return user && user.roles && user.roles.includes('Client');
  }
}
