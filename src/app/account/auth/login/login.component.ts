import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error: string | null = null;
  fieldTextType: boolean = false;
  year: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
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
        if (data && roles.includes('Client')) {
          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            text: 'Bienvenue sur votre espace client !',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/']); // client/dashboard
          });
        } else if (data && roles.includes('Livreur')) {
          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            text: 'Bienvenue sur votre espace livreur !',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/']); // livreur/dashboard
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Accès refusé',
            text: 'Rôle non reconnu. Veuillez contacter l’administrateur.'
          });
          this.authService.logout();
        }
      },
      error: (err) => {
        this.error = 'Compte introuvable. Veuillez saisir des identifiants valides ou vous inscrire.';
        Swal.fire({
          icon: 'error',
          title: 'Échec de connexion',
          text: this.error
        });
        console.error(err);
      }
    });
  }

  ForgotPassword() {
    this.router.navigate(['auth/reset-password']);
  }

  navigateToSignup() {
    this.router.navigate(['auth/signupsupplier']);
  }
}
