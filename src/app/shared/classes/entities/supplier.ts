
import { BaseEntity } from "./baseEntity";
import { Delivery } from "./delivery";
import { Vehicle } from "../enums/vehicle.enum";
import { User } from "./user";
import { AccidentRequest } from "./AccidentRequest";


export interface Supplier extends User{
  vehicule: Vehicle; 
  immatriculation: string;
  disponible: boolean; 
  actif: boolean; 
  dateAjout: string; 
  livraisons: Delivery[]; 
  accidents: AccidentRequest[]; 
}
