import { TestBed } from '@angular/core/testing';

import { LovValueService } from './lov-value.service';

describe('LovValueService', () => {
  let service: LovValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LovValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
