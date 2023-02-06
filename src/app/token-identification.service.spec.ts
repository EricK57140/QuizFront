import { TestBed } from '@angular/core/testing';

import { TokenidentificationService } from './token-identification.service';

describe('TokenidentificationService', () => {
  let service: TokenidentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenidentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
