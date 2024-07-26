import { Component, Input } from '@angular/core';
import { Zone } from 'src/app/types/zone';

@Component({
  selector: 'zone-detail',
  standalone: false,
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.scss']
})
export class ZoneDetailComponent {
  @Input() zone!: Zone;

  constructor() {}


}
