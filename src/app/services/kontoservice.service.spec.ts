import { TestBed } from '@angular/core/testing';

import { KontoserviceService } from './kontoservice.service';

describe('KontoserviceService', () => {
  let service: KontoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KontoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
