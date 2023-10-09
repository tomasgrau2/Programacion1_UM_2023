import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authsessionProfesorGuard } from './authsession-profesor.guard';

describe('authsessionProfesorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authsessionProfesorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
