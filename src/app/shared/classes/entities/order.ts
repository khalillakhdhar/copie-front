import { BaseEntity } from "./baseEntity";
import { Delivery } from "./delivery";
import { TypeOrder } from "../enums/typeOrder.enum";
import { User } from "./user";
import { Product } from 'src/app/shared/classes/entities/product';
import { Supplier } from './supplier';

export interface Order extends BaseEntity{
    etatCommande: TypeOrder; 
    utilisateur: User; 
    livraison: Delivery; 
    produits: Product[]; 
    supplier:Supplier;
  }