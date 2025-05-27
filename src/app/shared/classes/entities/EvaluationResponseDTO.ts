export interface EvaluationResponseDTO {
  id: number;
  note: number;
  commentaire?: string;
  utilisateurId: number;
  nomUtilisateur: string;
  dateEvaluation: string;  // ISO string (ex: "2025-05-16T12:34:56")
}