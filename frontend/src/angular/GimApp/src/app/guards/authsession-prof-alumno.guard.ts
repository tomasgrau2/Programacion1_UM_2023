import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authsessionProfAlumnoGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const rol = localStorage.getItem('rol');

  if (rol === 'profesor' || rol === 'alumno') {
    return true;
  } else {
    router.navigateByUrl('start');
    return false;
  }
};