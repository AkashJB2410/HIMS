import { TestBed } from '@angular/core/testing';

import { SpetialityService } from './spetiality.service';

describe('SpetialityService', () => {
  let service: SpetialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpetialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
