import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/classes/entities/user';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrl: './profile-summary.component.css'
})
export class ProfileSummaryComponent {

  user!: User; 
  userId!: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.userId = +localStorage.getItem('userId')!; 
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user; 
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors du chargement des informations de l'utilisateur.");
      }
    });
  }
}