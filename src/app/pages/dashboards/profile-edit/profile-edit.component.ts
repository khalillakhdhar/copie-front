import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
 activeTab = 0;
  userForm!: FormGroup;
  addressForm!: FormGroup;
  profileForm!: FormGroup;

  userId!: number;
  selectedImageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  profileImage: string | null = null;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = +id;
      this.initForms();
      this.loadUserData();
    }
  }

  initForms(): void {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      motDePasse: ['']
    });

    this.addressForm = this.fb.group({
      rue: [''],
      ville: [''],
      codePostale: [''],
      province: ['']
    });

    this.profileForm = this.fb.group({
      dateNaissance: [''],
      genre: ['']
    });
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone
        });

        if (user.adresse) {
          this.addressForm.patchValue({
            rue: user.adresse.rue,
            ville: user.adresse.ville,
            codePostale: user.adresse.codePostale,
            province: user.adresse.province
          });
        }

        if (user.profile) {
          this.profileForm.patchValue({
            dateNaissance: user.profile.dateNaissance,
            genre: user.profile.genre
          });

          if (user.profile.photoUrl) {
            this.profileImage = user.profile.photoUrl;
          }
        }
      },
      error: (err) => {
        console.error('Failed to load user data', err);
        this.toastr.error('Erreur lors du chargement des données utilisateur');
      }
    });
  }

 onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  
  if (input.files && input.files[0]) {
    this.selectedImageFile = input.files[0];

    // Créer la prévisualisation
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result; // URL de prévisualisation
    };
    reader.readAsDataURL(this.selectedImageFile);
  } else {
    this.imagePreview = null;
  }
}
getCurrentImageUrl(): string {
  if (this.profileImage) {
    return `http://localhost:8080/api/files/${this.profileImage}`;
  }
  return 'assets/images/default-profile.png'; // Chemin vers une image par défaut
}

  nextTab(): void {
    if (this.activeTab < 2) {
      this.activeTab++;
    }
  }

  prevTab(): void {
    if (this.activeTab > 0) {
      this.activeTab--;
    }
  }

  saveAll(): void {
    if (this.isSaving) return;
    
    this.isSaving = true;
    this.toastr.info('Enregistrement en cours...');

    if (this.selectedImageFile) {
      this.uploadImageAndSave();
    } else {
      this.saveUserData();
    }
  }

  private uploadImageAndSave(): void {
    if (!this.selectedImageFile) {
      this.saveUserData();
      return;
    }

    const oldImagePath = this.profileImage || undefined;
    
    this.fileUploadService.uploadImage(this.selectedImageFile, 'profile', oldImagePath).subscribe({
      next: (res: any) => {
        if (res.success && res.filePath) {
          this.profileImage = res.filePath;
          this.saveUserData();
        } else {
          this.handleError('Erreur lors du traitement de l\'image');
        }
      },
      error: (err) => {
        console.error('Image upload error', err);
        this.handleError('Échec de l\'upload de l\'image');
      }
    });
  }

  private saveUserData(): void {
    const userData = {
      ...this.userForm.value,
      adresse: this.addressForm.value,
      profile: {
        ...this.profileForm.value,
        photoUrl: this.profileImage
      }
    };

    // Remove password if not changed
    if (!userData.motDePasse) {
      delete userData.motDePasse;
    }

    this.userService.updateUser(this.userId, userData).subscribe({
      next: () => {
        this.toastr.success('Profil mis à jour avec succès');
        setTimeout(() => this.router.navigate(['/profilSummary']), 1500);
      },
      error: (err) => {
        console.error('Update error', err);
        this.handleError(err.error?.message || 'Erreur lors de la mise à jour');
      },
      complete: () => {
        this.isSaving = false;
      }
    });
  }

  private handleError(message: string): void {
    this.toastr.error(message);
    this.isSaving = false;
  }
}