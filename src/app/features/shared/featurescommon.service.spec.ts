import { TestBed } from '@angular/core/testing';

import { FeaturescommonService } from './featurescommon.service';

describe('FeaturescommonService', () => {
  let service: FeaturescommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturescommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
