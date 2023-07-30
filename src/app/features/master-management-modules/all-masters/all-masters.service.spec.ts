import { TestBed } from '@angular/core/testing';

import { AllMastersService } from './all-masters.service';

describe('AllMastersService', () => {
  let service: AllMastersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllMastersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
