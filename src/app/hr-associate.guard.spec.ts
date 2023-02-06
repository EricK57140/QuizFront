import { TestBed } from '@angular/core/testing';

import { HrAssociateGuard } from './hr-associate.guard';

describe('HrAssociateGuard', () => {
  let guard: HrAssociateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HrAssociateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
