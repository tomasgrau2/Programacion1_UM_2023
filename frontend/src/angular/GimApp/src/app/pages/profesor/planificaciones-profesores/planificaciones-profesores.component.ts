import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanificacionesService } from 'src/app/services/planificaciones.service';

@Component({
  selector: 'app-planificaciones-profesores',
  templateUrl: './planificaciones-profesores.component.html',
  styleUrls: ['./planificaciones-profesores.component.css']
})
export class PlanificacionesProfesoresComponent implements OnInit {
  planificaciones: any[] = [];
  currentPage: number = 1;
  totalPaginas: number = 0;
  pages: number[] = [];
  searchTerm: string = '';
  isSearching: boolean = false;
  
  // Variables para el modal de edición
  editForm: FormGroup;
  selectedPlanificacion: any = null;
  isModalOpen: boolean = false;
  isCreateMode: boolean = false;

  constructor(
    private planificacionesService: PlanificacionesService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      lunes: ['', Validators.required],
      martes: ['', Validators.required],
      miercoles: ['', Validators.required],
      jueves: ['', Validators.required],
      viernes: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPlanificaciones(this.currentPage);
  }

  get rol() {
    return localStorage.getItem('rol');
  }

  loadPlanificaciones(page: number) {
    this.planificacionesService.getPlanificaciones(page).subscribe((data: any) => {
      this.planificaciones = data.planificaciones;
      this.currentPage = data.page;
      this.totalPaginas = data.pages;
      console.log('Planificaciones cargadas:', this.planificaciones);
      console.log('Página actual:', this.currentPage);
      console.log('Total de páginas:', this.totalPaginas);

      this.pages = Array.from({length: this.totalPaginas}, (_, i) => i + 1);
    });
  }

  // Método para abrir el modal de edición
  openEditModal(planificacion?: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    this.isCreateMode = !planificacion;
    this.selectedPlanificacion = planificacion;
    
    if (planificacion) {
      // Modo edición
      this.editForm.patchValue({
        lunes: planificacion.lunes || '',
        martes: planificacion.martes || '',
        miercoles: planificacion.miercoles || '',
        jueves: planificacion.jueves || '',
        viernes: planificacion.viernes || ''
      });
    } else {
      // Modo creación
      this.editForm.reset();
    }
    
    this.editForm.markAllAsTouched();
    
    // Mostrar el modal
    const modalElement = document.getElementById('editPlanificacionModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
      this.isModalOpen = true;
    }
  }

  // Método para guardar los cambios
  savePlanificacion() {
    if (this.isFormValid()) {
      const formData = this.editForm.value;
      
      if (this.isCreateMode) {
        // Crear nueva planificación
        this.planificacionesService.createPlanificacion(formData).subscribe(
          (response) => {
            console.log('Planificación creada con éxito', response);
            this.closeModal();
            this.loadPlanificaciones(this.currentPage);
            alert('Planificación creada correctamente');
          },
          (error) => {
            console.error('Error al crear la planificación:', error);
            alert('Error al crear la planificación');
          }
        );
      } else {
        // Actualizar planificación existente
        this.planificacionesService.updatePlanificacion(this.selectedPlanificacion.id, formData).subscribe(
          (response) => {
            console.log('Planificación actualizada con éxito', response);
            
            // Actualizar la lista local
            const index = this.planificaciones.findIndex((p: any) => p.id === this.selectedPlanificacion.id);
            if (index !== -1) {
              this.planificaciones[index] = { ...this.planificaciones[index], ...formData };
            }
            
            this.closeModal();
            alert('Planificación actualizada correctamente');
          },
          (error) => {
            console.error('Error al actualizar la planificación:', error);
            alert('Error al actualizar la planificación');
          }
        );
      }
    }
  }

  // Método para eliminar planificación
  deletePlanificacion(planificacion: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (confirm('¿Estás seguro de que quieres eliminar esta planificación?')) {
      this.planificacionesService.deletePlanificacion(planificacion.id).subscribe(
        (response) => {
          console.log('Planificación eliminada con éxito');
          
          // Actualizar la lista local
          const index = this.planificaciones.findIndex((p: any) => p.id === planificacion.id);
          if (index !== -1) {
            this.planificaciones.splice(index, 1);
          }
          
          alert('Planificación eliminada correctamente');
        },
        (error) => {
          console.error('Error al eliminar la planificación:', error);
          alert('Error al eliminar la planificación');
        }
      );
    }
  }

  // Método para validar el formulario
  isFormValid(): boolean {
    if (!this.editForm) return false;
    
    const formValue = this.editForm.value;
    const isValid = formValue.lunes && 
                   formValue.martes && 
                   formValue.miercoles && 
                   formValue.jueves && 
                   formValue.viernes;
    
    return isValid;
  }

  // Método para cerrar el modal
  closeModal() {
    const modalElement = document.getElementById('editPlanificacionModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.isModalOpen = false;
    this.selectedPlanificacion = null;
    this.isCreateMode = false;
    this.editForm.reset();
  }

  // Método para obtener el nombre del día en español
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
