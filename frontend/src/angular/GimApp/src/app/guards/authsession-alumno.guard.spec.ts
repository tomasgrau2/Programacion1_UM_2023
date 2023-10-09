import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authsessionAlumnoGuard } from './authsession-alumno.guard';

describe('authsessionAlumnoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authsessionAlumnoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
