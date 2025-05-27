import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/shared/services/reclamation.service';
import { Reclamation } from 'src/app/shared/classes/entities/reclamation';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent  {
  reclamationForm: FormGroup;
  
  typesReclamation = [
  'Livraison',
	'Facturation',
	'Service_Client',
	'Accident',
	'Autre'
  ];
  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService,
    private router: Router,
    private authService: AuthService
  ) {
    this.reclamationForm = this.fb.group({
      dateReclamation: [new Date(), Validators.required],
      //nomClient: ['', [Validators.required, Validators.maxLength(50)]],
     // prenomClient: ['', [Validators.required, Validators.maxLength(50)]],
      //emailClient: ['', [Validators.required, Validators.email]],
      //adresseClient: ['', Validators.required],
      typeReclamation: ['', Validators.required],
      titre: ['', [Validators.required, Validators.maxLength(100)]],
      sujet: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      resultatSouhaite: ['', [Validators.required, Validators.maxLength(500)]],
     
      consentement: [false, Validators.requiredTrue]
    });
  }
  onSubmit() {
    console.log(this.reclamationForm);
    

    
    if (this.reclamationForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      console.log(currentUser);
      if (!currentUser) {
        Swal.fire('Erreur', 'Utilisateur non connecté.', 'error');
        return;
      }
      console.log(currentUser);
      const reclamation: Reclamation = {
        ...this.reclamationForm.value,
        statut: 'En attente',
        utilisateur: {
        id: currentUser.id,
        nom: currentUser.nom,
        prenom: currentUser.prenom,
        email: currentUser.email,
        telephone: currentUser.telephone
      }
    };
      console.log('Réclamation:', reclamation);
      this.reclamationService.sendReclamation(reclamation).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Réclamation envoyée',
            text: 'Votre réclamation a été enregistrée avec succès !'
          }).then(() => this.router.navigate(['/']));
        },
        error: (err) => {
          console.error('Erreur:', err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'envoi de la réclamation.', 'error');
        }
      });
    } else {
      Swal.fire('Formulaire invalide', 'Veuillez remplir tous les champs obligatoires.', 'warning');
    }
    }
  }





