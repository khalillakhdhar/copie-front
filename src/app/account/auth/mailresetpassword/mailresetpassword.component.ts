import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-mailresetpassword',
  templateUrl: './mailresetpassword.component.html',
  styleUrl: './mailresetpassword.component.css'
})
export class MailresetpasswordComponent  implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  submitted = false;
  isLoading = false;
  success: string = '';
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      if (!this.token) {
        this.error = 'Token de réinitialisation invalide ou manquant';
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('newPassword')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.resetForm.invalid || !this.token) {
      return;
    }

    this.isLoading = true;

    this.userService.resetPassword(
      this.token,
      this.resetForm.value.newPassword
    ).subscribe({
      next: () => {
        this.success = 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.error = error.error?.message || 'Une erreur est survenue. Le lien peut être expiré ou invalide.';
        this.isLoading = false;
      }
    });
  }
}