import { TestBed } from '@angular/core/testing';

import { FinanzserviceService } from './finanzservice.service';

describe('FinanzserviceService', () => {
  let service: FinanzserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanzserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
