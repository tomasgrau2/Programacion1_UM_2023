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

  // Método para actualizar un usuario
  updateUser(userId: number, data: any) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.put(this.url + `/usuario/${userId}`, data, {headers: headers});
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

    return this.httpClient.get(this.url + `/alumnos?page=${page}`, {headers: headers});
  }

  postAlumnos(userID: number, nroSocio?: string) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const body = { 
      id_usuario: userID,
      nro_socio: nroSocio || null
    };

    return this.httpClient.post(this.url + `/alumnos`, body,  {headers: headers});
  }

  // Método para obtener un alumno específico
  getAlumno(alumnoId: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/alumno/${alumnoId}`, {headers: headers});
  }

  // Método para actualizar un alumno
  updateAlumno(alumnoId: number, data: any) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.put(this.url + `/alumno/${alumnoId}`, data, {headers: headers});
  }

  // Método para eliminar un alumno
  deleteAlumno(alumnoId: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.delete(this.url + `/alumno/${alumnoId}`, {headers: headers});
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

  postProfesores(userID: number, especialidad: string) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const body = { 
      id_usuario: userID,
      especialidad: especialidad
    };

    return this.httpClient.post(this.url + `/profesores`, body,  {headers: headers});
  }

  // Actualizar profesor
  updateProfesor(profesorId: number, data: any) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.put(this.url + `/profesor/${profesorId}`, data, {headers: headers});
  }

  // Obtener datos del usuario actual
  getUsuarioActual() {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/usuario/actual`, {headers: headers});
  }

  // Actualizar datos del usuario actual
  updateUsuarioActual(data: any) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.put(this.url + `/usuario/actual`, data, {headers: headers});
  }

  // Obtener profesor por user_id
  getProfesorByUserId(userId: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/profesor/usuario/${userId}`, {headers: headers});
  }

  // Suspender/Activar usuario
  toggleSuspension(userId: number, suspendido: boolean) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const body = { suspendido: suspendido };

    return this.httpClient.put(this.url + `/usuario/${userId}`, body, {headers: headers});
  }
// --------------------------------------------------------------------------------------------------



  
  
    
}