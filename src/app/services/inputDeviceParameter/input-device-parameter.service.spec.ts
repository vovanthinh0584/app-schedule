import { TestBed } from '@angular/core/testing';

import { InputDeviceParameterService } from './input-device-parameter.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputDeviceParameterService = TestBed.get(InputDeviceParameterService);
    expect(service).toBeTruthy();
  });
});
