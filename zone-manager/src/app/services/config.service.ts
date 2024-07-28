import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Config } from '../types/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config!: Config;

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<Config> {
    return this.http.get<Config>('assets/config.json').pipe(
      tap(config => this.config = config)
    );
  }

  getConfig(): Config {
    return this.config;
  }
}
