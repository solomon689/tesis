import { TestBed } from '@angular/core/testing';

import { CurrentSessionGuard } from './current-session.guard';

describe('CurrentSessionGuard', () => {
  let guard: CurrentSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CurrentSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
