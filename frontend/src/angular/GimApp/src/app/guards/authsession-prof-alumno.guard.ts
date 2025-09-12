import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

export const authsessionProfAlumnoGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  // Verificar si existe token y rol
  if (!token || !rol) {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    router.navigateByUrl('start');
    return false;
  }

  try {
    // Decodificar y verificar el token JWT
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Verificar si el token ha expirado
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      router.navigateByUrl('start');
      return false;
    }

    // Verificar el rol
    if (rol === 'profesor' || rol === 'alumno') {
      return true;
    } else {
      router.navigateByUrl('start');
      return false;
    }
  } catch (error) {
    // Si hay error al decodificar el token, limpiar y redirigir
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    router.navigateByUrl('start');
    return false;
  }
};