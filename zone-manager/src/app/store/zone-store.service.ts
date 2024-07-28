import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

import { Zone } from '../types/zone';
const MAX_POINT = 4

@Injectable({
  providedIn: 'root'
})
export class ZoneStoreService implements OnDestroy{

  private selectedZone$ :BehaviorSubject<Zone> = new BehaviorSubject<Zone>({id:-1,name:"", points:[]})
  private isDrawingZone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private allZones$: BehaviorSubject<Zone[]> = new BehaviorSubject<Zone[]>([
    {
      id: 1,
      name: 'zone1',
      points: [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
    },
    {
      id: 1,
      name: 'zone1',
      points: [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
    },
    {
      id: 1,
      name: 'zone1',
      points: [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
    },
    {
      id: 1,
      name: 'zone1',
      points: [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
    },
    {
      id: 1,
      name: 'zone1',
      points: [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
    },
    {
      id: 2,
      name: 'zone2',
      points: [[5.3, 12.0], [8.3, 12.0], [8.3, 8.0], [4.4, 4.7]]
    }])
  private polygon: number[][] = [];

  constructor() { }

  public getSelectedZone(): Observable<Zone>{
    return this.selectedZone$.asObservable();
  }
  public getSelectedZoneSnapShot(): Zone {
    return this.selectedZone$.getValue();
  }
  public setSelectedZone(zone: Zone): void{
    this.selectedZone$.next(zone);
  }

  public addPointToSelectedZone(point: number[]):void{
    const zone = this.getSelectedZoneSnapShot()
    this.setSelectedZone({...zone,points:[...zone.points,point]})
  }
  public getIsDrawingZone(): Observable<boolean>{
    return this.isDrawingZone$.asObservable();
  }
  public getIsDrawingZoneSnapShot(): boolean {
    return this.isDrawingZone$.getValue();
  }

  public setIsDrawingZone(isDrawing: boolean): void {
    this.isDrawingZone$.next(isDrawing);
  }

  public getAllZones(): Observable<Zone[]>{
    return this.allZones$.asObservable();
  }
  public getAllZonesSnapShot(): Zone[] {
    return this.allZones$.getValue();
  }

  public setAllZones(zones: Zone[]): void {
    this.allZones$.next(zones);
  }
  public addZone(zone: Zone): void {
    this.allZones$.next([...this.getAllZonesSnapShot(),zone]);
  }

  public getPolygon(): number[][]{
    return this.polygon;
  }
  public setPointToPolygon(point: number[]): void{
    if(this.polygon.length < MAX_POINT) this.polygon.push(point)
  }
  public setPolygon(polygon: number[][]){
    this.polygon = polygon
  }

  ngOnDestroy(): void {
    this.selectedZone$.unsubscribe();
    this.isDrawingZone$.unsubscribe();
    this.allZones$.unsubscribe();
  }
}
