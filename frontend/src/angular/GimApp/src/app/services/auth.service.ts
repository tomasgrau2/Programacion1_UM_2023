import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router'
import jwtDecode from 'jwt-decode';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = '/api';
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(dataLogin:any): Observable<any> {
    // let dataLogin = {email: "alumno.ejemplo@um.edu.ar", contrasena: "contrasena1235"}
    return this.httpClient.post(this.url + '/auth/login', dataLogin).pipe(take(1))
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/','start'])
  }
  
  get isToken() {
    return localStorage.getItem('token');
  }

  // Limpiar tokens expirados al iniciar la aplicación
  clearExpiredTokens() {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (!token || !rol) {
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      // Si el token ha expirado, limpiarlo
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        console.log('Token expirado eliminado del localStorage');
      }
    } catch (error) {
      // Si hay error al decodificar el token, limpiarlo
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      console.log('Token inválido eliminado del localStorage');
    }
  }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // getUserRole(): string | null {
  //   const token = this.getToken();
  //   if (token) {
  //     const decodedToken: any = jwtDecode(token);
  //     return decodedToken.role; // Suponiendo que el token contiene un campo 'role'
  //   }
  //   return null;
  // }
}


