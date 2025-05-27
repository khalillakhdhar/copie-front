import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
@Injectable({ providedIn: 'root' })



export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const token = localStorage.getItem('authToken');
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      const currentRole=roles[0];
      const expectedRoles: string[] = route.data['roles'];
  
      if (!token) {
        this.router.navigate(['/auth/login']);
        return false;
      }
  
      if (expectedRoles && expectedRoles!=currentRole) {
        // Rôle pas autorisé
        this.router.navigate(['/unauthorized']);
        return false;
      }
  
      return true;
    }
}

