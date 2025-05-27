import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccidentService } from 'src/app/shared/services/accident.service';
import { Router } from '@angular/router';
import { Severity } from 'src/app/shared/classes/enums/severity';

import { AuthService } from '../../../../shared/services/auth.service';
@Component({
  selector: 'app-repport-accident',
  templateUrl: './repport-accident.component.html',
  styleUrl: './repport-accident.component.css'
})
export class RepportAccidentComponent implements OnInit {
 accidentForm!: FormGroup;
  severityOptions: Severity[] = ['LEGERE', 'MOYENNE', 'GRAVE'];
  messageSuccess = '';
  messageError = '';

  constructor(
    private fb: FormBuilder,
    private accidentService: AccidentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setGeolocation();
  }

  private initForm() {
    this.accidentForm = this.fb.group({
      dateAccident: [new Date().toISOString().slice(0,16), Validators.required], // date + heure locale ISO, format compatible input type=datetime-local
      severity: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
  }

  private setGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.accidentForm.patchValue({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        (err) => {
          console.warn('Géolocalisation non disponible ou refusée', err);
          // Laisser les champs vides, l'utilisateur peut saisir manuellement
        }
      );
    }
  }

  onSubmit() {
    if (this.accidentForm.invalid) {
      this.messageError = 'Veuillez remplir tous les champs obligatoires.';
      this.messageSuccess = '';
      return;
    }
    const storedUserId = localStorage.getItem('userId');
    const livreurId = storedUserId ? parseInt(storedUserId, 10) : null;

  if (!livreurId) {
    this.messageError = "Impossible d'identifier le livreur. Veuillez vous reconnecter.";
    return;
  }
    this.messageError = '';
    const accident: any = this.accidentForm.value;

    this.accidentService.signalerAccident(accident,livreurId).subscribe({

      next: (res) => {
        console.log(livreurId);
        console.log(accident);

        this.messageSuccess = 'Accident signalé avec succès !';
        this.accidentForm.reset();
        // Replacer la date par défaut et essayer géolocalisation encore
        this.accidentForm.patchValue({ dateAccident: new Date().toISOString().slice(0,16) });
        this.setGeolocation();
      },
      error: (err) => {
        this.messageError = 'Erreur lors du signalement. Merci de réessayer.';
        console.error(err);
      }
    });
  }
}
