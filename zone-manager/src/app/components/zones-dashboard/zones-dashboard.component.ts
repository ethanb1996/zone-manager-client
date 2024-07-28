import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, take, tap, throwError } from 'rxjs';
import { CanvasActionsService } from 'src/app/services/canvas-actions.service';
import { ZoneApiService } from 'src/app/services/zone-api.service';
import { ZoneStoreService } from 'src/app/store/zone-store.service';
import { Zone, ZoneDetails } from 'src/app/types/zone';

const MAX_POINT = 4

@Component({
  selector: 'zones-dashboard',
  templateUrl: './zones-dashboard.component.html',
  styleUrls: ['./zones-dashboard.component.scss']
})
export class ZonesDashboardComponent implements OnInit, OnDestroy {
// TODO - insert a name input for the user 

  private subscriptions: Subscription = new Subscription();
  constructor(public zoneStoreService: ZoneStoreService,
    private canvasActionsService: CanvasActionsService,
    private zoneApiService: ZoneApiService) { }


  ngOnInit(): void {
    const subscription = this.zoneApiService.fetchZones().pipe(
      tap((zones: Zone[]) => this.zoneStoreService.setAllZones(zones)),
      catchError(error => {
        console.error('Error fetching zones', error);
        return throwError(() => new Error(error));
      })
    ).subscribe();
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    
  }

  createZone() {
    this.canvasActionsService.clearCanvas();
    this.zoneStoreService.addZone({} as Zone)
    this.zoneStoreService.setPolygon([]);
    this.zoneStoreService.setIsDrawingZone(true)
  }
  saveZone() {
    this.zoneStoreService.setIsDrawingZone(false);
    // Call the api here
    if (this.isZoneValid()) {
      const zoneDetails : ZoneDetails = {name: "test",points: this.zoneStoreService.getPolygon() }
      // this.zoneStoreService.addZone({ id: 1111, name: "sdfsdf", points: this.zoneStoreService.getPolygon() })
      this.zoneApiService.createZone(zoneDetails).pipe(take(1)).subscribe()
      this.zoneStoreService.setPolygon([]);
      this.canvasActionsService.clearCanvas();
    }
  }
  clearCanvas() {
    this.zoneStoreService.setIsDrawingZone(false);
    this.canvasActionsService.clearCanvas();
  }

  private isZoneValid() {
    return this.zoneStoreService.getPolygon().length === MAX_POINT;
  }
}
