import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PasswordresetComponent {
  resetForm: FormGroup;
  submitted = false;
  isLoading = false;
  success: string = '';
  error: string = '';
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {this.resetForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });}

  

  ngAfterViewInit() {}

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    // Arrêter si le formulaire est invalide
    if (this.resetForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.userService.requestPasswordReset(this.resetForm.value.email).subscribe({
      next: () => {
        this.success = 'Un email de réinitialisation a été envoyé. Vérifiez votre boîte mail.';
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }

}