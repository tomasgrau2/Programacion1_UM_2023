import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionesService {
  url = '/api';
  
  constructor(
    private httpClient: HttpClient,
  ) { }

  // Obtener lista de planificaciones
  getPlanificaciones(page: number = 1) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/planificaciones?page=${page}`, {headers: headers});
  }

  // Obtener una planificación específica
  getPlanificacion(planificacionId: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/planificaciones/${planificacionId}`, {headers: headers});
  }

  // Crear una nueva planificación
  createPlanificacion(data: any) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.post(this.url + '/planificaciones', data, {headers: headers});
  }

  // Actualizar una planificación
  updatePlanificacion(planificacionId: number, data: any) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.put(this.url + `/planificaciones/${planificacionId}`, data, {headers: headers});
  }

  // Eliminar una planificación
  deletePlanificacion(planificacionId: number) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.delete(this.url + `/planificaciones/${planificacionId}`, {headers: headers});
  }

  // Buscar planificaciones por día
  searchPlanificacionesByDay(day: string, page: number = 1) {
    let auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + `/planificaciones?${day}=${encodeURIComponent(day)}&page=${page}`, {headers: headers});
  }
}
