import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authsessionAlumnoGuard : CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const rol = localStorage.getItem('rol');

  if(rol!='alumno') {
    router.navigateByUrl('start');
    return false;
  } else {
    return true;
  }
};