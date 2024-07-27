import { BehaviorSubject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

import { Zone } from '../types/zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneStoreService implements OnDestroy{

  private selectedZone :BehaviorSubject<Zone> = new BehaviorSubject<Zone>(null as unknown as Zone)
  constructor() { }

  public getSelectedZone(): BehaviorSubject<Zone>{
    return this.selectedZone;
  }
  public getSelectedZoneSnapShot(): Zone {
    return this.selectedZone.getValue();
  }

  public setSelectedZone(zone: Zone): void{
    this.selectedZone.next(zone);
  }

  ngOnDestroy(): void {
    this.selectedZone.unsubscribe();
  }
}
