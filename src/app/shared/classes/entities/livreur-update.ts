import { Vehicle } from "../enums/vehicle.enum";

export interface LivreurUpdate {
   vehicule?: Vehicle;
   immatriculation?: string;
   disponible?: boolean;
   actif?: boolean;
}
