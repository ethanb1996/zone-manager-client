import { Component } from '@angular/core';
import { CanvasActionsService } from 'src/app/services/canvas-actions.service';
import { ZoneStoreService } from 'src/app/store/zone-store.service';

const MAX_POINT = 4

@Component({
  selector: 'zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent {

  constructor(public zoneStoreService: ZoneStoreService,
    private canvasActionsService:CanvasActionsService) { }

  createZone() {
    this.canvasActionsService.clearCanvas();
    this.zoneStoreService.setPolygon([]);
    
    // this.zoneStoreService.setSelectedZone(newZone);
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

  private isZoneValid(){
    return this.zoneStoreService.getPolygon().length === MAX_POINT;
  }
}
