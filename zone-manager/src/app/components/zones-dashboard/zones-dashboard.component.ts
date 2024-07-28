import { Component } from '@angular/core';
import { CanvasActionsService } from 'src/app/services/canvas-actions.service';
import { ZoneApiService } from 'src/app/services/zone-api.service';
import { ZoneStoreService } from 'src/app/store/zone-store.service';

const MAX_POINT = 4

@Component({
  selector: 'zones-dashboard',
  templateUrl: './zones-dashboard.component.html',
  styleUrls: ['./zones-dashboard.component.scss']
})
export class ZonesDashboardComponent {

  constructor(public zoneStoreService: ZoneStoreService,
    private canvasActionsService:CanvasActionsService) { }

  createZone() {
    this.canvasActionsService.clearCanvas();
    this.zoneStoreService.setPolygon([]);
    this.zoneStoreService.setIsDrawingZone(true)
  }
  saveZone() {
    this.zoneStoreService.setIsDrawingZone(false);
    // Call the api here
    if(this.isZoneValid()){
      this.zoneStoreService.addZone({id:1111, name:"sdfsdf",points: this.zoneStoreService.getPolygon()})
      this.zoneStoreService.setPolygon([]);
      this.canvasActionsService.clearCanvas();
    }
  }
  clearCanvas() {
    this.zoneStoreService.setIsDrawingZone(false);
    this.canvasActionsService.clearCanvas();
  }

  private isZoneValid(){
    return this.zoneStoreService.getPolygon().length === MAX_POINT;
  }
}
