import { BaseEntity } from "./baseEntity";

export interface Position extends BaseEntity {
  latitude: number;
  longitude: number;
  timestamp: string;
  livreurId: number;
}