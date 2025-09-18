import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  profesores: any[] = [];
  profesoresAgrupados: { [especialidad: string]: any[] } = {};
  especialidades: string[] = [];
  loading = true;
  error = '';

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.cargarProfesores();
  }

  cargarProfesores() {
    this.loading = true;
    this.error = '';
    
    // Usar endpoint público para obtener profesores sin autenticación
    this.usuariosService.getProfesoresPublicos(1).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);
        this.profesores = response.profesores || [];
        
        if (this.profesores.length === 0) {
          this.error = 'No hay profesores registrados en el sistema.';
        } else {
          this.agruparProfesoresPorEspecialidad();
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar profesores:', error);
        console.error('Detalles del error:', error.error);
        
        if (error.status === 422) {
          this.error = 'Error en la petición al servidor.';
        } else if (error.status === 0) {
          this.error = 'No se puede conectar con el servidor.';
        } else {
          this.error = `Error al cargar los profesores (${error.status}).`;
        }
        this.loading = false;
      }
    });
  }


  agruparProfesoresPorEspecialidad() {
    this.profesoresAgrupados = {};
    this.especialidades = [];

    this.profesores.forEach(profesor => {
      if (profesor.especialidad) {
        const especialidad = profesor.especialidad;
        
        if (!this.profesoresAgrupados[especialidad]) {
          this.profesoresAgrupados[especialidad] = [];
          this.especialidades.push(especialidad);
        }
        
        this.profesoresAgrupados[especialidad].push(profesor);
      }
    });

    // Ordenar especialidades alfabéticamente
    this.especialidades.sort();
  }

  getProfesoresPorEspecialidad(especialidad: string) {
    return this.profesoresAgrupados[especialidad] || [];
  }
}
