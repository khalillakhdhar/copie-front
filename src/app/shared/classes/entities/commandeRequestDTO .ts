
export interface CommandeRequestDTO {
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  pays: string;
  notesCommande?: string;
  modeLivraison: string;
  total: number;
  produitIds: number[];
  }






