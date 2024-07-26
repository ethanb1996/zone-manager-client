import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { ZoneDetailComponent } from './components/zone-detail/zone-detail.component';
import { CanvasBoardComponent } from './components/canvas-board/canvas-board.component';
import { ZonesDashboardComponent } from './components/zones-dashboard/zones-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ZoneListComponent,
    ZoneDetailComponent,
    CanvasBoardComponent,
    ZonesDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
