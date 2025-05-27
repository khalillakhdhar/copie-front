import { User } from "src/app/store/Authentication/auth.models";
import { TypeReclamation } from "../enums/typeReclamation.enum";
import { BaseEntity } from "./baseEntity";

export interface Reclamation extends BaseEntity{
    dateReclamation: string;
    typeReclamation: TypeReclamation; 
    titre:string;
    sujet: string;
    description: string;
    statut: string;
    resultatSouhaite: string;
    utilisateur: User;
}
