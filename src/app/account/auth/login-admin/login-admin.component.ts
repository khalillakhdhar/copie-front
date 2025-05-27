import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit {
  adminLoginForm: FormGroup;
  submitted = false;
  error: string = '';
   year: number;

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
  ) {this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.adminLoginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.adminLoginForm.invalid) {
          Swal.fire({
            icon: 'warning',
            title: 'Formulaire invalide',
            text: 'Veuillez remplir tous les champs correctement.'
          });
          return;
        }

    this.authService.login(this.f.email.value, this.f.password.value).subscribe({
      next: (data) => {
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');

        if (data && roles.includes('Administrateur')) {
           Swal.fire({
                      icon: 'success',
                      title: 'Connexion réussie',
                      text: 'Bienvenue sur votre espace Administrateur !',
                      timer: 2000,
                      showConfirmButton: false
                    }).then(() => {
                      this.router.navigate(['/']); // Admin/dashboard
                    });
        } 
        else {
          this.error = 'Accès non autorisé pour cet espace.';
          this.authService.logout();
          this.router.navigate(['/auth/login']); 
        }
      },
      error: (err) => {
        alert("Erreur d'authentification : " + err.error);
    }
    });
  }
}