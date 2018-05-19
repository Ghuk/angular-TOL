import { TestBed, inject } from '@angular/core/testing';

import { TolService } from './tol.service';

describe('TolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TolService]
    });
  });

  it('should be created', inject([TolService], (service: TolService) => {
    expect(service).toBeTruthy();
  }));
});
