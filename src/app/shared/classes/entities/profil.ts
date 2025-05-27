import { User } from "./user";
export interface Profil {
  id: number; 
  dateNaissance: string; 
  genre: string; 
  photoUrl?: string;
  utilisateur: User; 
}
