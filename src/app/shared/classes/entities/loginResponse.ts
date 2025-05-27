import { Role } from "../enums/role.enum";
//pour l'uiliser pour extraire le token 5atir 
//fil back login yraja3li token w email w id w role 
export interface LoginResponse {
    token: string;
    email: string;
    userId: number; 
    roles: string[];
}