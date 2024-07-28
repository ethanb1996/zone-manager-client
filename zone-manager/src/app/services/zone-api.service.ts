import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';
import { Zone, ZoneDetails } from '../types/zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneApiService {

  constructor(private http: HttpClient,
    private configService: ConfigService
  ) { }

  fetchZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${this.configService.getConfig().baseUrl}/all_zones`);
  }

  createZone(zoneDetails: ZoneDetails): Observable<Zone> {
    return this.http.post<Zone>(`${this.configService.getConfig().baseUrl}/create_zone`, { ...zoneDetails });
  }

  deleteZone(id:number): Observable<any> {
    return this.http.delete<any>(`${this.configService.getConfig().baseUrl}/delete_zone/${id}`);
  }
}
