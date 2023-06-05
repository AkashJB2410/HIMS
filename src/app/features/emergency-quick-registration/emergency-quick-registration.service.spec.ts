import { TestBed } from '@angular/core/testing';

import { EmergencyQuickRegistrationService } from './emergency-quick-registration.service';

describe('EmergencyQuickRegistrationService', () => {
  let service: EmergencyQuickRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyQuickRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
