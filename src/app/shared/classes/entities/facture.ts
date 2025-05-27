import { BaseEntity } from "./baseEntity";
import { CommandeRequestDTO } from './commandeRequestDTO ';
import { Order } from "./order";

export interface Facture extends BaseEntity{
  
  numeroFacture: string;
  dateFacturation: Date;
  montantTotal: number;
  commandeId: number;
  utilisateurId: number;
  commande :Order;
}
