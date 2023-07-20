import { TestBed } from '@angular/core/testing';

import { SmsConfigurationService } from './sms-configuration.service';

describe('SmsConfigurationService', () => {
  let service: SmsConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
