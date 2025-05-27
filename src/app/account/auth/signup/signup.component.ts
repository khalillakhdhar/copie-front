import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/classes/entities/user';
import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from 'src/app/core/services/user.service';
import { Store } from '@ngrx/store';
import { Register } from 'src/app/store/Authentication/authentication.actions';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})
export class SignupComponent{
  signupForm: FormGroup;
  submitted = false;
  successmsg: string | null = null;
  error: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]

    });
  }

  
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.successmsg = '';
    this.error = '';

    
    if (this.signupForm.invalid) {
      return;
    }

    
    const newUser: User = {
      id: 0, 
      createdAt: '', 
      updatedAt: '', 
      nom: this.signupForm.value.username,
      prenom: this.signupForm.value.prenom,
      telephone: this.signupForm.value.telephone,
      email: this.signupForm.value.email,
      motDePasse: this.signupForm.value.password,
      roles: [this.signupForm.value.role] 
    };
console.log("current ",newUser);
    this.userService.register(newUser).subscribe({
      next: (data) => {
        console.log(data);
       Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Votre compte a été créé avec succès',
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.router.navigate(['auth/loginAdmin']);
        }, 2000);
      },
      error: (err) => {
        let errorMsg = 'Une erreur inconnue est survenue';
        if (err?.error?.message) {
          errorMsg = err.error.message;
        } else if (err?.message) {
          errorMsg = err.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorMsg
        });
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['auth/loginAdmin']);
  }
}
