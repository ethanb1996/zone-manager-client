import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesDashboardComponent } from './zones-dashboard.component';

describe('ZonesDashboardComponent', () => {
  let component: ZonesDashboardComponent;
  let fixture: ComponentFixture<ZonesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
