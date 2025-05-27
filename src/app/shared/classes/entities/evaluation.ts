import { User } from "src/app/store/Authentication/auth.models";
import { BaseEntity } from "./baseEntity";
import { Delivery } from "./delivery";

export interface Evaluation extends BaseEntity {
    rate: number; 
    commentaire: string; 
    dateEvaluation: string; 
    utilisateur: User; 
    livraison: Delivery; 
  }