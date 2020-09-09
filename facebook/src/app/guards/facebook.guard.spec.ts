import { TestBed } from '@angular/core/testing';

import { FacebookGuard } from './facebook.guard';

describe('FacebookGuard', () => {
  let guard: FacebookGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FacebookGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
