import { TestBed } from '@angular/core/testing';

import { ApibomberoService } from './apibombero.service';

describe('ApibomberoService', () => {
  let service: ApibomberoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApibomberoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
