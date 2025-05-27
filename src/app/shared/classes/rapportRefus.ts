import { Delivery } from "./entities/delivery";
import { Supplier } from "./entities/supplier";
export interface RapportRefus{
    id: number;
    motif: string;
    dateCreation: string;
    livreur: Supplier;
    livraison: Delivery;
}