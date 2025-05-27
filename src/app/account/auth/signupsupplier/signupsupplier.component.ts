import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/classes/enums/role.enum';
import { Vehicle } from 'src/app/shared/classes/enums/vehicle.enum';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signupsupplier',
  templateUrl: './signupsupplier.component.html',
  styleUrls: ['./signupsupplier.component.css']
})
export class SignupsupplierComponent implements OnInit {
  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }
  signupForm!: FormGroup;
  submitted = false;
  selectedRole: string = '';
  vehicleTypes = Object.values(Vehicle);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private supplierService:SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      role: ['', Validators.required],
      vehicule: [Vehicle.Voiture, Validators.required],
      immatriculation: ['']
    });

    this.signupForm.get('role')?.valueChanges.subscribe(role => {
      this.selectedRole = role;

      if (role === 'Livreur') {
        this.signupForm.get('vehicule')?.setValidators(Validators.required);
        this.signupForm.get('immatriculation')?.setValidators([
          Validators.required,
          Validators.pattern(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/)
        ]);
      } else {
        this.signupForm.get('vehicule')?.clearValidators();
        this.signupForm.get('immatriculation')?.clearValidators();
      }

      this.signupForm.get('vehicule')?.updateValueAndValidity();
      this.signupForm.get('immatriculation')?.updateValueAndValidity();
    });
  }

  get f() {
    return this.signupForm.controls;
  }
onSubmit(): void {
  this.submitted = true;

  if (this.signupForm.invalid) {
    return;
  }

  const role = this.signupForm.value.role;

  if (role === 'Client') {
    const user = {
  id: 0,
  createdAt: '',
  updatedAt: '',
  nom: this.signupForm.value.nom,
  prenom: this.signupForm.value.prenom,
  email: this.signupForm.value.email,
  telephone: this.signupForm.value.telephone,
  motDePasse: this.signupForm.value.motDePasse,
  roles: [Role.Client]
};


    this.userService.register(user).subscribe({
      next: () => {
        Swal.fire({
                  icon: 'success',
                  title: 'Inscription client réussie',
                  text: 'Votre compte a été créé avec succès',
                  timer: 2000,
                  showConfirmButton: false
                });
                setTimeout(() => {
                  this.router.navigate(['auth/login']);
                }, 2000);
      },
      error: err => {
        console.error(err);
        Swal.fire('Erreur', 'Erreur lors de l’inscription client', 'error');
      }
    });

  } else if (role === 'Livreur') {
   const supplier = {
  id: 0, 
  createdAt: '', 
  updatedAt: '',
  nom: this.signupForm.value.nom,
  prenom: this.signupForm.value.prenom,
  email: this.signupForm.value.email,
  telephone: this.signupForm.value.telephone,
  motDePasse: this.signupForm.value.motDePasse,
  roles: [Role.Livreur],
  vehicule: this.signupForm.value.vehicule as Vehicle,
  immatriculation: this.signupForm.value.immatriculation,
  disponible: true,
  actif: true,
  dateAjout: new Date().toISOString(),
  livraisons: [],
  accidents: []
};


    this.supplierService.createSupplier(supplier).subscribe({
      next: () => {
        Swal.fire({
                  icon: 'success',
                  title: 'Inscription livreur réussie',
                  text: 'Votre compte a été créé avec succès',
                  timer: 2000,
                  showConfirmButton: false
                });
                setTimeout(() => {
                  this.router.navigate(['auth/login']);
                }, 2000);
        
      },
      error: err => {
        console.error(err);
        Swal.fire('Erreur', 'Erreur lors de l’inscription livreur', 'error');
      }
    });

  } else {
    Swal.fire('Erreur', 'Rôle invalide', 'error');
  }
}

}
