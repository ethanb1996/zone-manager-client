import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { ZoneDetailComponent } from './components/zone-detail/zone-detail.component';
import { CanvasBoardComponent } from './components/canvas-board/canvas-board.component';
import { ZonesDashboardComponent } from './components/zones-dashboard/zones-dashboard.component';
import { ConfigService } from './services/config.service';
import { lastValueFrom } from 'rxjs';

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
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadConfig(configService: ConfigService) {
  return () => lastValueFrom(configService.loadConfig());
}
