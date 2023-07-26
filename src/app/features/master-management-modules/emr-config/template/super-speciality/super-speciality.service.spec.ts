import { TestBed } from '@angular/core/testing';

import { SuperSpecialityService } from './super-speciality.service';

describe('SuperSpecialityService', () => {
  let service: SuperSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
