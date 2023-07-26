import { TestBed } from '@angular/core/testing';

import { ActionButtonService } from './action-button.service';

describe('ActionButtonService', () => {
  let service: ActionButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
