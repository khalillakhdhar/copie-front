import { Severity } from "../enums/severity";
import { BaseEntity } from "./baseEntity";

export interface AccidentResponse extends BaseEntity {
  dateAccident: string;
  severity: Severity;
  latitude: number;
  longitude: number;
  livreurName: string;  }