import { User } from "src/app/store/Authentication/auth.models";

import { BaseEntity } from "./baseEntity";
import { DeliveryStatus } from "../enums/deliveryStatus.enum";
import { Evaluation } from "./evaluation";
import { Order } from "./order";
import { Supplier } from "./supplier";
import { AccidentRequest } from "./AccidentRequest";
export interface Delivery extends BaseEntity {
    adresseLivraison: string;
    dateLivraisonPrevue: string; 
    statut: DeliveryStatus; 
    evaluation?: Evaluation;
    accidents: AccidentRequest []; 
    commande?: Partial<Order>;
    utilisateur?: User; 
    livreur?: Supplier; 
}
