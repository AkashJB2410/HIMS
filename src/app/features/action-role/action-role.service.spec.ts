import { TestBed } from '@angular/core/testing';

import { ActionRoleService } from './action-role.service';

describe('ActionRoleService', () => {
  let service: ActionRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
