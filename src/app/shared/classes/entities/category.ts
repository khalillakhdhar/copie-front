import { BaseEntity } from "./baseEntity";
import { Product } from "./product";

export interface Category extends BaseEntity{
 nomCategorie: string; 
  description: string; 
  produits: Product[]; 
}
