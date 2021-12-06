import { TestBed } from '@angular/core/testing';

import { NoingresarGuard } from './noingresar.guard';

describe('NoingresarGuard', () => {
  let guard: NoingresarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoingresarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
