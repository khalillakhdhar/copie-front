import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/classes/entities/user';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
 
})

/**
 * Contacts-profile component
 */export class ProfileComponent implements OnInit {
  activeTab = 0;
  
  userForm!: FormGroup;
  addressForm!: FormGroup;
  profileForm!: FormGroup;

  userId!: number;
  selectedImageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  profileImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private toastr: ToastrService
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
      nom: [''],
      prenom: [''],
      email: ['', [Validators.email]],
      telephone: [''],
      motDePasse: ['']
    });

    this.addressForm = this.fb.group({
      rue: ['', Validators.required],
      ville: ['', Validators.required],
      codePostale: ['', Validators.required],
      province: ['', Validators.required]
    });

    this.profileForm = this.fb.group({
      dateNaissance: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.userForm.patchValue({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone
      });

      if (user.profile) {
        this.profileForm.patchValue({
          dateNaissance: user.profile.dateNaissance,
          genre: user.profile.genre
        });

        if (user.profile.photoUrl) {
          this.profileImage = user.profile.photoUrl;
          this.imagePreview = `http://31.97.36.146:8080/api/files/${user.profile.photoUrl}`;
        }
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];

      // Prévisualisation
      const reader = new FileReader();
      reader.onload = (e) => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedImageFile);

      // Upload immédiat
      this.uploadImage(this.selectedImageFile);
    }
  }

  uploadImage(file: File): void {
    const oldPath = this.profileImage; // Ancien chemin pour suppression si nécessaire
    
    this.fileUploadService.uploadImage(file, 'profile', oldPath).subscribe({
      next: (res: any) => {
        if (res.success && res.filePath) {
          this.profileImage = res.filePath;
          this.imagePreview = `http://31.97.36.146:8080/api/files/${res.filePath}`;
          this.toastr.success('Image uploadée avec succès');
        } else {
          this.toastr.error('Réponse invalide lors de l\'upload');
        }
      },
      error: (err) => {
        console.error('Erreur upload image', err);
        this.toastr.error('Erreur lors de l\'upload de l\'image');
      }
    });
  }

  nextTab(): void {
    if (this.activeTab === 0) {
      this.activeTab = 1;
    } else if (this.activeTab === 1 && this.addressForm.valid) {
      this.saveAddress();
    }
  }

  saveAddress(): void {
    this.userService.addAddress(this.userId, this.addressForm.value).subscribe({
      next: () => {
        this.activeTab = 2;
      },
      error: err => {
        this.toastr.error("Erreur lors de l'enregistrement de l'adresse");
        console.error(err);
      }
    });
  }

  saveProfile(): void {
    const profileData = this.profileForm.value;
    
    // Ajoute le chemin de l'image si elle existe
    if (this.profileImage) {
      profileData.photoUrl = this.profileImage;
    }

    this.userService.addProfile(this.userId, profileData).subscribe({
      next: () => {
        this.toastr.success("Profil enregistré avec succès !");
        this.activeTab = 0;
        setTimeout(() => {
          this.router.navigate(['/profilSummary']);
        }, 2000);
      },
      error: err => {
        this.toastr.error("Erreur lors de l'enregistrement du profil");
        console.error(err);
      }
    });
  }

  saveAll(): void {
    if (this.activeTab === 2 && this.profileForm.valid) {
      this.saveProfile();
    } else if (this.activeTab === 1 && this.addressForm.valid) {
      this.saveAddress();
    } else if (this.activeTab === 0 && this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => {
          this.toastr.success("Informations personnelles mises à jour !");
          this.nextTab();
        },
        error: err => {
          this.toastr.error("Erreur lors de la mise à jour");
          console.error(err);
        }
      });
    }
  }
}