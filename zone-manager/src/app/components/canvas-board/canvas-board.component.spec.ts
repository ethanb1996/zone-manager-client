import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasBoardComponent } from './canvas-board.component';

describe('CanvasBoardComponent', () => {
  let component: CanvasBoardComponent;
  let fixture: ComponentFixture<CanvasBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
