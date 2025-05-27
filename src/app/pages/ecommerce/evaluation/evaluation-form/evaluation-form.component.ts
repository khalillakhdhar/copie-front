import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationRequestDTO } from 'src/app/shared/classes/entities/EvaluationRequestDTO';
import { EvaluationService } from 'src/app/shared/services/evaluation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrl: './evaluation-form.component.css'
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  utilisateurId!: number;

  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService,
    private router: Router
  ) {
    this.evaluationForm = this.fb.group({
      note: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      commentaire: ['']
    });
  }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.utilisateurId = parseInt(storedUserId, 10);
    } else {
      console.warn('Utilisateur non connecté.');
    }
  }

  get f() {
    return this.evaluationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.evaluationForm.invalid) {
      return;
    }

    const evaluation: EvaluationRequestDTO = {
      note: this.f['note'].value,
      commentaire: this.f['commentaire'].value
    };

    this.evaluationService.createEvaluation(evaluation, this.utilisateurId)
      .subscribe({
        next: () => {
          this.successMessage = 'Merci pour votre évaluation !';
          this.evaluationForm.reset();
          this.submitted = false;
          setTimeout(() => {
          this.router.navigate(['/']);
      }, 2000);
        },
        error: () => {
          this.errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
        }
      });
  }
}