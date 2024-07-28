import { Component, OnInit } from '@angular/core';
import { ZoneApiService } from 'src/app/services/zone-api.service';

@Component({
  selector: 'zones-dashboard',
  templateUrl: './zones-dashboard.component.html',
  styleUrls: ['./zones-dashboard.component.scss']
})
export class ZonesDashboardComponent implements OnInit {

  constructor(private zoneApiService:ZoneApiService) { }

  ngOnInit(): void {
    
  }
}
