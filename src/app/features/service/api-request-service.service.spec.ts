import { TestBed } from '@angular/core/testing';

import { ApiRequestServiceService } from './api-request-service.service';

describe('ApiRequestServiceService', () => {
  let service: ApiRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
