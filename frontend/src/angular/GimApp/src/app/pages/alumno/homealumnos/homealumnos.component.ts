import { Component, OnInit } from '@angular/core';
import { PlanificacionesService } from '../../../services/planificaciones.service';

@Component({
  selector: 'app-homealumnos',
  templateUrl: './homealumnos.component.html',
  styleUrls: ['./homealumnos.component.css']
})
export class HomealumnosComponent implements OnInit {
  planificaciones: any[] = [];
  alumnoId: number | null = null;
  loading = true;
  nombreUsuario: string = '';
  expandedPlanificaciones: { [key: number]: boolean } = {};

  constructor(private planificacionesService: PlanificacionesService) {}

  ngOnInit(): void {
    this.loadAlumnoId();
  }

  loadAlumnoId(): void {
    // Obtener el ID del usuario desde el token JWT
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        this.nombreUsuario = payload.nombre || 'Usuario';
        
        // Buscar el alumno correspondiente a este usuario
        this.findAlumnoByUserId(userId);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  findAlumnoByUserId(userId: number): void {
    // Hacer una petición para obtener el alumno por id_usuario
    this.planificacionesService.getAlumnoByUserId(userId).subscribe({
      next: (response: any) => {
        if (response && response.id) {
          // El nuevo endpoint devuelve directamente el objeto alumno
          this.alumnoId = response.id; // Este es el id de la tabla alumnos
          this.loadPlanificaciones();
        } else {
          console.error('No se encontró el alumno para el usuario:', userId);
          this.loading = false;
        }
      },
      error: (error: any) => {
        console.error('Error al buscar alumno:', error);
        this.loading = false;
      }
    });
  }

  loadPlanificaciones(): void {
    if (this.alumnoId) {
      this.planificacionesService.getPlanificacionesByAlumno(this.alumnoId).subscribe({
        next: (response: any) => {
          this.planificaciones = (response.planificaciones || []).sort((a: any, b: any) => {
            // Ordenar por fecha de creación de más reciente a más antigua
            return new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime();
          });
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error al cargar planificaciones:', error);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  getDayName(day: string): string {
    const days: { [key: string]: string } = {
      'lunes': 'Lunes',
      'martes': 'Martes',
      'miercoles': 'Miércoles',
      'jueves': 'Jueves',
      'viernes': 'Viernes'
    };
    return days[day] || day;
  }

  getCurrentDay(): string {
    const today = new Date();
    const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    return days[today.getDay()];
  }

  getTodayPlanificacion(): any {
    const today = this.getCurrentDay();
    return this.planificaciones.find(p => p[today] && p[today].trim() !== '');
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  togglePlanificacion(planificacionId: number): void {
    this.expandedPlanificaciones[planificacionId] = !this.expandedPlanificaciones[planificacionId];
  }

  isPlanificacionExpanded(planificacionId: number): boolean {
    return this.expandedPlanificaciones[planificacionId] || false;
  }
}
