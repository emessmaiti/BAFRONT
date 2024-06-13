import { TestBed } from '@angular/core/testing';

import { BenutzerserviceService } from './benutzerservice.service';

describe('BenutzerserviceService', () => {
  let service: BenutzerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenutzerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
