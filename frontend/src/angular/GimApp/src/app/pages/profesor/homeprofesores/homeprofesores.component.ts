import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanificacionesService } from '../../../services/planificaciones.service';
import { AuthService } from '../../../services/auth.service';
import { UsuariosService } from '../../../services/usuarios.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-homeprofesores',
  templateUrl: './homeprofesores.component.html',
  styleUrls: ['./homeprofesores.component.css']
})
export class HomeprofesoresComponent implements OnInit {
  planificaciones: any[] = [];
  planificacionForm: FormGroup;
  editingPlanificacion: any = null;
  profesorId: number | null = null;
  alumnos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private planificacionesService: PlanificacionesService,
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {
    this.planificacionForm = this.fb.group({
      id_alumno: ['', Validators.required],
      lunes: [''],
      martes: [''],
      miercoles: [''],
      jueves: [''],
      viernes: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfesorId();
    this.loadAlumnos();
  }

  loadProfesorId(): void {
    const token = localStorage.getItem('token');
    console.log('Token completo:', token);
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Token decodificado completo:', decodedToken);
        
        // El JWT contiene el objeto usuario completo, necesitamos acceder al campo id
        const userId = decodedToken.id;
        console.log('User ID encontrado:', userId);
        
        if (!userId) {
          console.error('No se encontró user_id en el token. Campos disponibles:', Object.keys(decodedToken));
          return;
        }
        
        // Obtener el profesor por user_id usando el endpoint específico
        this.usuariosService.getProfesorByUserId(userId).subscribe({
          next: (response: any) => {
            this.profesorId = response.id;
            console.log('Profesor ID encontrado:', this.profesorId);
            this.loadPlanificaciones();
          },
          error: (error: any) => {
            console.error('Error al obtener profesor:', error);
          }
        });
      } catch (error) {
        console.error('Error al decodificar token:', error);
      }
    } else {
      console.error('No se encontró token en localStorage');
    }
  }

  loadPlanificaciones(): void {
    if (this.profesorId) {
      this.planificacionesService.getPlanificacionesByProfesor(this.profesorId).subscribe({
        next: (response: any) => {
          this.planificaciones = response.planificaciones || response;
          this.ensureCardsExpanded();
        },
        error: (error: any) => {
          console.error('Error al cargar planificaciones:', error);
        }
      });
    }
  }

  loadAlumnos(): void {
    this.usuariosService.getAlumnos(1).subscribe({
      next: (response: any) => {
        this.alumnos = response.alumnos || response;
        console.log('Alumnos cargados:', this.alumnos);
      },
      error: (error: any) => {
        console.error('Error al cargar alumnos:', error);
      }
    });
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  toggleCard(planificacion: any, event: Event): void {
    if (this.isMobile()) {
      event.stopPropagation();
      planificacion.expanded = !planificacion.expanded;
    }
  }

  ensureCardsExpanded(): void {
    this.planificaciones.forEach(planificacion => {
      if (!this.isMobile()) {
        planificacion.expanded = true;
      }
    });
  }

  openEditModal(planificacion?: any): void {
    this.editingPlanificacion = planificacion;
    
    if (planificacion) {
      this.planificacionForm.patchValue({
        id_alumno: planificacion.id_alumno || '',
        lunes: planificacion.lunes || '',
        martes: planificacion.martes || '',
        miercoles: planificacion.miercoles || '',
        jueves: planificacion.jueves || '',
        viernes: planificacion.viernes || ''
      });
    } else {
      this.planificacionForm.reset();
    }

    const modalElement = document.getElementById('planificacionModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  editPlanificacion(planificacion: any, event: Event): void {
    event.stopPropagation();
    this.openEditModal(planificacion);
  }

  savePlanificacion(): void {
    if (this.isFormValid() && this.profesorId) {
      const formData = this.planificacionForm.value;
      formData.id_profesor = this.profesorId;
      
      // Asegurar que se envíe el id_alumno correcto
      if (formData.id_alumno) {
        formData.id_alumno = parseInt(formData.id_alumno);
      }

      console.log('Datos a enviar:', formData);

      if (this.editingPlanificacion) {
        this.planificacionesService.updatePlanificacion(this.editingPlanificacion.id, formData).subscribe({
          next: (response: any) => {
            console.log('Planificación actualizada:', response);
            this.loadPlanificaciones();
            this.closeModal();
          },
          error: (error: any) => {
            console.error('Error al actualizar planificación:', error);
          }
        });
      } else {
        this.planificacionesService.createPlanificacion(formData).subscribe({
          next: (response: any) => {
            console.log('Planificación creada:', response);
            this.loadPlanificaciones();
            this.closeModal();
          },
          error: (error: any) => {
            console.error('Error al crear planificación:', error);
          }
        });
      }
    } else {
      console.log('Formulario no válido o profesorId faltante');
      console.log('isFormValid():', this.isFormValid());
      console.log('profesorId:', this.profesorId);
      console.log('formData:', this.planificacionForm.value);
    }
  }

  deletePlanificacion(planificacionId: number, event: Event): void {
    event.stopPropagation();
    
    if (confirm('¿Estás seguro de que quieres eliminar esta planificación?')) {
      this.planificacionesService.deletePlanificacion(planificacionId).subscribe({
        next: (response: any) => {
          this.loadPlanificaciones();
        },
        error: (error: any) => {
          console.error('Error al eliminar planificación:', error);
        }
      });
    }
  }

  isFormValid(): boolean {
    const form = this.planificacionForm.value;
    const hasExercises = form.lunes?.trim() || form.martes?.trim() || form.miercoles?.trim() || 
                        form.jueves?.trim() || form.viernes?.trim();
    
    if (this.editingPlanificacion) {
      // Para editar, solo necesita ejercicios
      return hasExercises;
    } else {
      // Para crear, necesita alumno y ejercicios
      return form.id_alumno && hasExercises;
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('planificacionModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
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
}
