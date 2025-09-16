import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanificacionesService } from '../../../services/planificaciones.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-planificaciones-admin',
  templateUrl: './planificaciones-admin.component.html',
  styleUrls: ['./planificaciones-admin.component.css']
})
export class PlanificacionesAdminComponent implements OnInit {
  planificaciones: any[] = [];
  profesores: any[] = [];
  alumnos: any[] = [];
  currentPage = 1;
  totalPaginas = 1;
  pages: number[] = [];
  searchTerm = '';
  isSearching = false;
  
  // Modal
  editForm: FormGroup;
  selectedPlanificacion: any = null;
  isModalOpen = false;
  isCreateMode = false;

  constructor(
    private planificacionesService: PlanificacionesService,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      lunes: ['', Validators.required],
      martes: ['', Validators.required],
      miercoles: ['', Validators.required],
      jueves: ['', Validators.required],
      viernes: ['', Validators.required],
      id_alumno: ['', Validators.required],
      id_profesor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPlanificaciones();
    this.loadProfesores();
    this.loadAlumnos();
  }

  // Detectar si es dispositivo móvil
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  // Toggle de expansión de cards
  toggleCard(planificacion: any, event: Event): void {
    if (this.isMobile()) {
      event.stopPropagation();
      planificacion.expanded = !planificacion.expanded;
    }
  }

  loadPlanificaciones(page: number = 1): void {
    this.planificacionesService.getPlanificaciones(page).subscribe({
      next: (response: any) => {
        this.planificaciones = response.planificaciones || [];
        
        // Inicializar estado de expansión - SIEMPRE expandido en desktop
        this.planificaciones.forEach((planificacion) => {
          const isMobile = this.isMobile();
          planificacion.expanded = !isMobile; // Expandido en desktop, contraído en móvil
        });
        
        this.currentPage = response.page || 1;
        this.totalPaginas = response.pages || 1;
        this.generatePages();
        
        // Asegurar que las tarjetas estén expandidas después de cargar
        setTimeout(() => {
          this.ensureCardsExpanded();
        }, 200);
      },
      error: (error) => {
        console.error('Error al cargar planificaciones:', error);
      }
    });
  }

  loadProfesores(): void {
    this.usuariosService.getProfesores(1).subscribe({
      next: (response: any) => {
        this.profesores = response.usuarios || [];
      },
      error: (error) => {
        console.error('Error al cargar profesores:', error);
      }
    });
  }

  loadAlumnos(): void {
    this.usuariosService.getAlumnos(1).subscribe({
      next: (response: any) => {
        this.alumnos = response.alumnos || [];
      },
      error: (error) => {
        console.error('Error al cargar alumnos:', error);
      }
    });
  }

  generatePages(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPaginas; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPaginas) {
      this.loadPlanificaciones(page);
    }
  }

  openEditModal(planificacion?: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    this.isCreateMode = !planificacion;
    this.selectedPlanificacion = planificacion;

    if (this.isCreateMode) {
      this.editForm.reset();
      this.editForm.patchValue({
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        id_alumno: '',
        id_profesor: ''
      });
    } else {
      this.editForm.patchValue({
        lunes: planificacion.lunes || '',
        martes: planificacion.martes || '',
        miercoles: planificacion.miercoles || '',
        jueves: planificacion.jueves || '',
        viernes: planificacion.viernes || '',
        id_alumno: planificacion.id_alumno || '',
        id_profesor: planificacion.id_profesor || ''
      });
    }

    this.isModalOpen = true;
  }

  savePlanificacion(): void {
    if (!this.isFormValid()) {
      return;
    }

    const formData = this.editForm.value;

    // Convertir los IDs a números y validar
    const idAlumno = parseInt(formData.id_alumno);
    const idProfesor = parseInt(formData.id_profesor);
    
    if (isNaN(idAlumno) || isNaN(idProfesor)) {
      alert('Error: IDs de alumno o profesor inválidos. Por favor selecciona un alumno y un profesor.');
      return;
    }
    
    const dataToSend = {
      ...formData,
      id_alumno: idAlumno,
      id_profesor: idProfesor
    };

    if (this.isCreateMode) {
      this.planificacionesService.createPlanificacion(dataToSend).subscribe({
        next: (response) => {
          this.closeModal();
          this.loadPlanificaciones(this.currentPage);
        },
        error: (error) => {
          console.error('Error al crear planificación:', error);
        }
      });
    } else {
      this.planificacionesService.updatePlanificacion(this.selectedPlanificacion.id, dataToSend).subscribe({
        next: (response) => {
          this.closeModal();
          this.loadPlanificaciones(this.currentPage);
        },
        error: (error) => {
          console.error('Error al actualizar planificación:', error);
        }
      });
    }
  }

  deletePlanificacion(planificacion: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    if (confirm(`¿Estás seguro de que quieres eliminar esta planificación?`)) {
      this.planificacionesService.deletePlanificacion(planificacion.id).subscribe({
        next: (response) => {
          this.loadPlanificaciones(this.currentPage);
        },
        error: (error) => {
          console.error('Error al eliminar planificación:', error);
        }
      });
    }
  }

  isFormValid(): boolean {
    const form = this.editForm.value;
    // Verificar que todos los campos existan y no sean null/undefined antes de usar trim()
    return form.lunes && form.lunes.trim() !== '' && 
           form.martes && form.martes.trim() !== '' && 
           form.miercoles && form.miercoles.trim() !== '' && 
           form.jueves && form.jueves.trim() !== '' && 
           form.viernes && form.viernes.trim() !== '' &&
           form.id_alumno && form.id_alumno !== '' &&
           form.id_profesor && form.id_profesor !== '';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedPlanificacion = null;
    this.isCreateMode = false;
    this.editForm.reset();
    
    // Remover el backdrop manualmente si existe
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    
    // Remover la clase modal-open del body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  ensureCardsExpanded(): void {
    // Solo aplicar en desktop
    if (!this.isMobile()) {
      setTimeout(() => {
        // Actualizar el estado de las planificaciones en el modelo
        this.planificaciones.forEach((planificacion) => {
          planificacion.expanded = true;
        });
        
        // También forzar las clases CSS
        const cards = document.querySelectorAll('.planificacion-card');
        cards.forEach((card) => {
          card.classList.add('expanded');
          card.classList.remove('mobile-collapsed');
        });
      }, 100);
    }
  }

  onModalBackdropClick(event: Event): void {
    // Solo cerrar si se hace clic en el backdrop (no en el contenido del modal)
    if (event.target === event.currentTarget) {
      this.closeModal();
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

  getProfesorName(profesorId: number): string {
    const profesor = this.profesores.find(p => p.r_profesor && p.r_profesor[0] && p.r_profesor[0].id === profesorId);
    if (profesor) {
      return `${profesor.nombre} ${profesor.apellido}`;
    }
    return 'Profesor no encontrado';
  }

  getAlumnoName(alumnoId: number): string {
    const alumno = this.alumnos.find(a => a.id === alumnoId);
    if (alumno && alumno.usuario) {
      return `${alumno.usuario.nombre} ${alumno.usuario.apellido}`;
    }
    return 'Alumno no encontrado';
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}