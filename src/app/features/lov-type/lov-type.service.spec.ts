import { TestBed } from '@angular/core/testing';

import { LovTypeService } from './lov-type.service';

describe('LovTypeService', () => {
  let service: LovTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LovTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
