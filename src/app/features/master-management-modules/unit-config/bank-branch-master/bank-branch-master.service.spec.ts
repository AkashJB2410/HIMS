import { TestBed } from '@angular/core/testing';

import { BankBranchMasterService } from './bank-branch-master.service';

describe('BankBranchMasterService', () => {
  let service: BankBranchMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankBranchMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
