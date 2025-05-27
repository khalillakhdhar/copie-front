import { BaseEntity } from "./baseEntity";
import { Category } from "./category";
import { Order } from "./order";

export interface Product extends BaseEntity {
    nomProduit: string; 
    description: string; 
    prix: number; 
    cassabilite: boolean; 
    quantiteEnStock: number; 
    image: string; 
    categorie: Category; 
    commandes: Order[]; 
  }