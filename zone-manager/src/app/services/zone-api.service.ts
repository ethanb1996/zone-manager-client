import { Injectable } from '@angular/core';
import { Zone, ZoneDetails } from '../types/zone';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZoneApiService {
  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  fetchZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${this.baseUrl}/all_zones`);
  }

  createZone(zoneDetails: ZoneDetails): Observable<Zone> {
    return this.http.post<Zone>(`${this.baseUrl}/create_zone`, { zoneDetails });
  }

  deleteZone(id:number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete_zone/${id}`);
  }
}
