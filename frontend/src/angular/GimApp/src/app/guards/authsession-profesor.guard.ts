import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authsessionProfesorGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const rol = localStorage.getItem('rol');

  if(rol!='profesor') {
    router.navigateByUrl('start');
    return false;
  } else {
    return true;
  }
};