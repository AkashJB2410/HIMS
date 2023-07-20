import { TestBed } from '@angular/core/testing';

import { MasterModuleService } from './master-module.service';

describe('MasterModuleService', () => {
  let service: MasterModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
