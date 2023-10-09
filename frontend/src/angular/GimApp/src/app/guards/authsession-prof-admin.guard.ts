
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authsessionProfAdminGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const rol = localStorage.getItem('rol');

  if (rol === 'profesor' || rol === 'admin') {
    return true;
  } else {
    router.navigateByUrl('start');
    return false;
  }
};