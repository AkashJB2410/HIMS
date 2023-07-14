import { TestBed } from '@angular/core/testing';

import { Base64ConverterService } from './base64-converter.service';

describe('Base64ConverterService', () => {
  let service: Base64ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64ConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
