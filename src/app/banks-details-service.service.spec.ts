import { TestBed } from '@angular/core/testing';

import { BanksDetailsServiceService } from './banks-details-service.service';

describe('BanksDetailsServiceService', () => {
  let service: BanksDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanksDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
