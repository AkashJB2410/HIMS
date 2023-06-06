import { TestBed } from '@angular/core/testing';

import { ErDischargePatientListService } from './er-discharge-patient-list.service';

describe('ErDischargePatientListService', () => {
  let service: ErDischargePatientListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErDischargePatientListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
