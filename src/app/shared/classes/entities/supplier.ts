
import { BaseEntity } from "./baseEntity";
import { Delivery } from "./delivery";
import { Vehicle } from "../enums/vehicle.enum";
import { User } from "./user";


export interface Supplier extends User{
  vehicule: Vehicle;
  immatriculation: string;
  disponible: boolean;
  actif: boolean;
  dateAjout: string;
  livraisons: Delivery[];
  accidents: any[];
}
