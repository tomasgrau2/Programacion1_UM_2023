import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authsessionProfAlumnoGuard } from './authsession-prof-alumno.guard';

describe('authsessionProfAlumnoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authsessionProfAlumnoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
