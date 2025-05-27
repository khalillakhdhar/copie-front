import { Role } from "../enums/role.enum";
import { Adresse } from "./adresse";
import { BaseEntity } from "./baseEntity";
import { Profil } from "./profil";
import { Delivery } from "./delivery";
import { Reclamation } from "./reclamation";
import { Order } from "./order";
import { Evaluation } from "./evaluation";
export interface User extends BaseEntity{
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motDePasse: string;
  roles: Role[];
  adresse?: Adresse; 
  profile?: Profil; 
  livraisons?: Delivery[]; 
  evaluations?: Evaluation[]; 
  reclamations?: Reclamation[]; 
  commandes?: Order[]; 
}

