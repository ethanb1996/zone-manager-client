import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasActionsService } from 'src/app/services/canvas-actions.service';
import { ZoneStoreService } from 'src/app/store/zone-store.service';
import { Zone } from 'src/app/types/zone';

@Component({
  selector: 'canvas-board',
  templateUrl: './canvas-board.component.html',
  styleUrls: ['./canvas-board.component.scss']
})
export class CanvasBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvasBoard', { static: true }) canvasBoard!: ElementRef<HTMLCanvasElement>;

  private zoneSubscription!: Subscription;

  constructor(private zoneStoreService: ZoneStoreService,
    private canvasActionsService: CanvasActionsService
  ) {}
  
  ngOnInit(): void {
    this.canvasActionsService.init(this.canvasBoard.nativeElement)
    
  }
  
  ngAfterViewInit(): void {
    this.zoneSubscription = this.zoneStoreService.getSelectedZone().subscribe((zone: Zone) => {
      if (zone) {
        this.canvasActionsService.editZoneOnCanvas(zone);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.zoneSubscription) {
      this.zoneSubscription.unsubscribe();
    }
    this.canvasActionsService.destroy();
  }

}
