import { Severity } from "../enums/severity";

export interface AccidentRequest {
  dateAccident: string;  
  severity: Severity;
  latitude: number;
  longitude: number;
}