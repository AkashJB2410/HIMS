import { TestBed } from '@angular/core/testing';

import { ActionSubModuleService } from './action-sub-module.service';

describe('ActionSubModuleService', () => {
  let service: ActionSubModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionSubModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
