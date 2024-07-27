import { TestBed } from '@angular/core/testing';

import { ZoneApiService } from './zone-api.service';

describe('ZoneApiService', () => {
  let service: ZoneApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
