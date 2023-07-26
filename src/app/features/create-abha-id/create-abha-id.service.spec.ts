import { TestBed } from '@angular/core/testing';

import { CreateAbhaIdService } from './create-abha-id.service';

describe('CreateAbhaIdService', () => {
  let service: CreateAbhaIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAbhaIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
