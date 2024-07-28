import { Component } from '@angular/core';
import { ZoneStoreService } from 'src/app/store/zone-store.service';
import { Zone } from 'src/app/types/zone';

@Component({
  selector: 'zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent {

  public zones: Zone[] = [
    {
      id: 1,
      name: 'zone1',
      points: [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
    },
    {
      id: 2,
      name: 'zone2',
      points: [[5.3, 12.0], [8.3, 12.0], [8.3, 8.0], [4.4, 4.7]]
    }]

  constructor(public zoneStoreService: ZoneStoreService) { }

  addZone() {
    const newZone = { id: Date.now(), name: `Zone ${this.zones.length + 1}`, points: [] };
    this.zones.push(newZone);
    this.zoneStoreService.setSelectedZone(newZone);
    this.zoneStoreService.setIsDrawingZone(true)
  }
  saveZone() {
    this.zoneStoreService.setIsDrawingZone(false);
    this.zoneStoreService.addZone(this.zoneStoreService.getSelectedZoneSnapShot())
  }
}
