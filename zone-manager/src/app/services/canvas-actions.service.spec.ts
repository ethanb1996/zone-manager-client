import { TestBed } from '@angular/core/testing';

import { CanvasActionsService } from './canvas-actions.service';

describe('CanvasActionsService', () => {
  let service: CanvasActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
