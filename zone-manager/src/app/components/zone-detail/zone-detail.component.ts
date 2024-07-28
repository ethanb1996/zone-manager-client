import { Component, Input } from '@angular/core';
import { ZoneStoreService } from 'src/app/store/zone-store.service';
import { Zone } from 'src/app/types/zone';

@Component({
  selector: 'zone-detail',
  standalone: false,
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.scss']
})
export class ZoneDetailComponent {
  @Input() zone!: Zone;

  constructor(private zoneStoreService: ZoneStoreService) { }

  selectZone() {
    this.zoneStoreService.setSelectedZone(this.zone);
  }

  deleteZone() {
    const zones = this.zoneStoreService.getAllZonesSnapShot();
    const zoneIndex = zones.findIndex(z => z.id === this.zone.id)
    if (zoneIndex > -1) {
      zones.splice(zoneIndex, 1);
      this.zoneStoreService.setAllZones(zones)
    }
  }
  editZone() {
  }
}
