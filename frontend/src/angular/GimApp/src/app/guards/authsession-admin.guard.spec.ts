import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authsessionAdminGuard } from './authsession-admin.guard';

describe('authsessionAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authsessionAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
