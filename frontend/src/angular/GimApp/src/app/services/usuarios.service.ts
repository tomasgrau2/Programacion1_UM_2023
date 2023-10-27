import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = '/api';
  constructor(
    private httpClient: HttpClient,
  ) { }

// USUARIOS

  getUsers() {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + '/usuarios', {headers: headers});
  }

  postUsers(dataRegister : any) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const body = dataRegister

    return this.httpClient.post(this.url + '/usuarios',body,  {headers: headers});
  }

  deleteUser(userId: number){
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.delete(this.url + `/usuario/${userId}`, {headers: headers});
  }


  getPendientes(page: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/usuarios?rol=users&page=${page}`, {headers: headers});
  }


  putRol(userId: number, rol: string) {
    let auth_token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
    const body = { rol: rol };
  
    return this.httpClient.put(this.url + `/usuario/${userId}`, body, {headers: headers});
  }
// ------------------------------------------------------------------------------------------



  // ALUMNOS

  getAlumnos(page: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/usuarios?rol=alumno&page=${page}`, {headers: headers});
  }

  postAlumnos(userID: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const body = { id_usuario: userID };

    return this.httpClient.post(this.url + `/alumnos `, body,  {headers: headers});
  }
  
// ---------------------------------------------------------------------------------------------------


  //  PROFESORES

  getProfesores(page: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/usuarios?rol=profesor&page=${page}`, {headers: headers});
  }
// --------------------------------------------------------------------------------------------------



  
  
    
}