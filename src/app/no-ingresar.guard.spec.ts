import { TestBed } from '@angular/core/testing';

import { NoIngresarGuard } from './noingresar.guard';

describe('NoIngresarGuard', () => {
  let guard: NoIngresarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoIngresarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
