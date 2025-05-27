import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Service {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  averageRating?: number;
  reviewCount?: number;
}

interface Review {
  id: number;
  serviceId: number;
  authorName: string;
  rating: number;
  comment: string;
  date: Date;
}
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
//implements OnInit 
export class ReviewComponent {
 
}