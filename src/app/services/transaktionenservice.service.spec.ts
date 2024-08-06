import { TestBed } from '@angular/core/testing';

import { Transaktionsservice } from './transaktionsservice.service';

describe('TransaktionenserviceService', () => {
  let service: Transaktionsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Transaktionsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
