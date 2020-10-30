import { TestBed } from '@angular/core/testing';

import { GrupoServiceService } from './grupo-service.service';

describe('GrupoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoServiceService = TestBed.get(GrupoServiceService);
    expect(service).toBeTruthy();
  });
});
