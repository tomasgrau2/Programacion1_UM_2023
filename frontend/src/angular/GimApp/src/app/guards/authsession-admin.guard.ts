import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authsessionAdminGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const rol = localStorage.getItem('rol');

  if(rol!='admin') {
    router.navigateByUrl('start');
    return false;
  } else {
    return true;
  }
};