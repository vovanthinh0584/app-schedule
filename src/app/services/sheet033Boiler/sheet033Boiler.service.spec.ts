import { TestBed } from '@angular/core/testing';

import { Sheet033BoilerService } from './Sheet033Boiler.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Sheet033BoilerService = TestBed.get(Sheet033BoilerService);
    expect(service).toBeTruthy();
  });
});
