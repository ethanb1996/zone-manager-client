import { Component } from '@angular/core';
import { ZoneStoreService } from 'src/app/store/zone-store.service';

const MAX_POINT = 4

@Component({
  selector: 'zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent {

  constructor(public zoneStoreService: ZoneStoreService) { }

}
