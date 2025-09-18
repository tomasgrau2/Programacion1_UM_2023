import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuspensionService {
  private url = '/api';
  private isSuspendedSubject = new BehaviorSubject<boolean>(false);
  public isSuspended$ = this.isSuspendedSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  // Verificar si el usuario actual está suspendido
  checkSuspensionStatus(): Observable<any> {
    const auth_token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.httpClient.get(this.url + '/usuario/actual', { headers: headers }).pipe(
      tap((response: any) => {
        // Actualizar el estado de suspensión
        this.isSuspendedSubject.next(response.suspendido || false);
      })
    );
  }

  // Obtener el estado actual de suspensión
  getCurrentSuspensionStatus(): boolean {
    return this.isSuspendedSubject.value;
  }

  // Verificar suspensión y manejar respuesta
  async checkAndHandleSuspension(): Promise<boolean> {
    try {
      const response = await this.checkSuspensionStatus().toPromise();
      const isSuspended = response?.suspendido || false;
      
      this.isSuspendedSubject.next(isSuspended);
      
      if (isSuspended) {
        // Si está suspendido, limpiar el localStorage y redirigir
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
      }
      
      return isSuspended;
    } catch (error) {
      console.error('Error al verificar estado de suspensión:', error);
      return false;
    }
  }

  // Método para obtener información del usuario suspendido
  getSuspensionMessage(): string {
    return 'Su cuenta se encuentra suspendida por falta de pagos, comuníquese con el gimnasio';
  }

  // Limpiar estado de suspensión (útil para logout)
  clearSuspensionStatus(): void {
    this.isSuspendedSubject.next(false);
  }
}
