import { TestBed } from '@angular/core/testing';

import { OpdRegistrationService } from './opd-registration.service';

describe('OpdRegistrationService', () => {
  let service: OpdRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpdRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
