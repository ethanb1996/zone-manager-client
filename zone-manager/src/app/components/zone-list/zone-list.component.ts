import { Component } from '@angular/core';
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
}
