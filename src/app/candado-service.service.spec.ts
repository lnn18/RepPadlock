import { TestBed } from '@angular/core/testing';

import { CandadoServiceService } from './candado-service.service';

describe('CandadoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandadoServiceService = TestBed.get(CandadoServiceService);
    expect(service).toBeTruthy();
  });
});
