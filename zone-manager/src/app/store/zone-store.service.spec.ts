import { TestBed } from '@angular/core/testing';

import { ZoneStoreService } from './zone-store.service';

describe('ZoneStoreService', () => {
  let service: ZoneStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
