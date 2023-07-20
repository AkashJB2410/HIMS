import { TestBed } from '@angular/core/testing';

import { MasterPageService } from './master-page.service';

describe('MasterPageService', () => {
  let service: MasterPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
