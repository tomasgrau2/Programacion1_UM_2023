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


