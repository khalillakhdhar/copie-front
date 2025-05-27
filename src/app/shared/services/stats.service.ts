import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://31.97.36.146:8080/api/stats';

  constructor(private http: HttpClient) {}

  getNewUsersByMonth() {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/new-users-by-month`);
  }

  getTopProducts(limit: number = 5) {
    return this.http.get<Array<{ name: string, sales: number }>>(
      `${this.apiUrl}/top-products?limit=${limit}`
    );
  }
 
getGlobalActivity(period: string) {
    return this.http.get<{
        orders: number,
        deliveries: number,
        claims: number
    }>(`${this.apiUrl}/global-activity?period=${period}`);
}
getIncidentsMap() {
    return this.http.get<any[]>(`${this.apiUrl}/incidents-map`);
}
}