import { FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, take, tap, throwError } from 'rxjs';

import { Zone, ZoneDetails } from 'src/app/types/zone';
import { ZoneApiService } from 'src/app/services/zone-api.service';
import { ZoneStoreService } from 'src/app/store/zone-store.service';
import { CanvasActionsService } from 'src/app/services/canvas-actions.service';
import { ConfigService } from 'src/app/services/config.service';


@Component({
  selector: 'zones-dashboard',
  templateUrl: './zones-dashboard.component.html',
  styleUrls: ['./zones-dashboard.component.scss']
})
export class ZonesDashboardComponent implements OnInit, OnDestroy {

  public zoneName: FormControl = new FormControl('');

  private subscriptions: Subscription = new Subscription();

  constructor(public zoneStoreService: ZoneStoreService,
    private canvasActionsService: CanvasActionsService,
    private zoneApiService: ZoneApiService,
    private configService: ConfigService) { }


  ngOnInit(): void {
    this.zoneApiService.fetchZones().pipe(
      take(1),
      tap((zones: Zone[]) => this.zoneStoreService.setAllZones(zones)),
      catchError(error => {
        console.error('Error fetching zones', error);
        return throwError(() => new Error(error));
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createZone() {
    this.canvasActionsService.clearCanvas();
    this.zoneStoreService.setPolygon([]);
    this.zoneStoreService.setIsDrawingZone(true)
  }
  saveZone() {
    this.zoneStoreService.setIsDrawingZone(false);
    if (this.isZoneValid()) {
      const zoneDetails: ZoneDetails = { name: this.zoneName.value, points: this.zoneStoreService.getPolygon() }
      this.zoneApiService.createZone(zoneDetails).pipe(
        take(1),
        tap((zone: Zone) => {
          this.zoneStoreService.addZone(zone)
          this.zoneName.setValue('')
        })).subscribe()
      this.zoneStoreService.setPolygon([]);
      this.canvasActionsService.clearCanvas();
    }
  }
  clearCanvas() {
    this.zoneStoreService.setIsDrawingZone(false);
    this.canvasActionsService.clearCanvas();
  }

  isZoneValid() {
    const firstPoint = this.zoneStoreService.getPolygon()[0]
    const lastPoint = this.zoneStoreService.getPolygon()[this.zoneStoreService.getPolygon().length - 1]
    return firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1]
  }
}
