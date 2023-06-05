import { TestBed } from '@angular/core/testing';

import { ErPatientListService } from './er-patient-list.service';

describe('ErPatientListService', () => {
  let service: ErPatientListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErPatientListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
