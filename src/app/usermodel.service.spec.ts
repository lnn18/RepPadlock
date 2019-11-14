import { TestBed } from '@angular/core/testing';

import {FirebaseUserModel} from './usermodel.service';

describe('FirebaseUserModel', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseUserModel = TestBed.get(FirebaseUserModel);
    expect(service).toBeTruthy();
  });
});
