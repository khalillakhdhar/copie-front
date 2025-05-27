import { User } from "./user";


export interface Adresse {
  id: number; 
  province: string; 
  codePostale: string; 
  ville: string; 
  rue: string; 
  utilisateur: User; 
}