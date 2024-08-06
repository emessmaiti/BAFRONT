import { TestBed } from '@angular/core/testing';

import { ZieleService } from './ziele.service';

describe('ZieleService', () => {
  let service: ZieleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZieleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
