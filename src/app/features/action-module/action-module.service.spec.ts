import { TestBed } from '@angular/core/testing';

import { ActionModuleService } from './action-module.service';

describe('ActionModuleService', () => {
  let service: ActionModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
