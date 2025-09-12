import { Component, OnInit, getModuleFactory } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-pendientes',
  templateUrl: './lista-pendientes.component.html',
  styleUrls: ['./lista-pendientes.component.css']
})
export class ListaPendientesComponent implements OnInit {
  usuarios: any[] = [];
  arrayPendientes: any;
  currentPage:any = 1;
  totalPaginas: number = 0;
  pages: number[] = [];
  searchTerm: string = '';
  isSearching: boolean = false;
  allPendientes: any[] = []; // Para almacenar todos los usuarios pendientes para búsqueda

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.loadPendientes(this.currentPage); 
  }

  asignarRol(usuario: any, rol: string) {
    this.usuariosService.putRol(usuario.id, rol).subscribe(
      (response) => {
        console.log(`Rol ${rol} asignado al usuario ${usuario.nombre}`);
        
        // Si el rol es 'alumno', crear también el registro en la tabla de alumnos
        if (rol === 'alumno') {
          this.usuariosService.postAlumnos(usuario.id).subscribe(
            (alumnoResponse) => {
              console.log(`Alumno creado en la tabla de alumnos:`, alumnoResponse);
            },
            (alumnoError) => {
              console.log('Error al crear alumno:', alumnoError);
            }
          );
        }
        
        // Si el rol es 'profesor', crear también el registro en la tabla de profesores
        if (rol === 'profesor') {
          this.usuariosService.postProfesores(usuario.id, 'General').subscribe(
            (profesorResponse) => {
              console.log(`Profesor creado en la tabla de profesores:`, profesorResponse);
            },
            (profesorError) => {
              console.log('Error al crear profesor:', profesorError);
            }
          );
        }
        
        // Actualizar lista
        const index = this.arrayPendientes.findIndex((u: { id: number; }) => u.id === usuario.id);
        if (index !== -1) {
        this.arrayPendientes.splice(index, 1);
        }
      },
      (error) => {
        console.log('Error al asignar rol:', error);
      }
    );
  }
  
  eliminarUsuario(userId: number) {
    this.usuariosService.deleteUser(userId).subscribe(
      (response) => {
        console.log('Usuario eliminado con éxito', userId);
        // Actualizar lista
        const index = this.arrayPendientes.findIndex((usuario: { id: number; }) => usuario.id === userId);
        if (index !== -1) {
        this.arrayPendientes.splice(index, 1);
      }
    }
    );
  }
  loadPendientes(page: any) {
    this.usuariosService.getPendientes(page).subscribe((data: any) => {
      this.arrayPendientes = data.usuarios;
      this.currentPage = data.page;
      this.totalPaginas = data.pages;
      console.log('Pagina actual:', this.currentPage);
      console.log('JSON data:', this.arrayPendientes);
      console.log('Total de paginas:', this.totalPaginas);

      this.pages = Array.from({length: this.totalPaginas}, (_, i) => i + 1);
      
      // Cargar todos los usuarios pendientes para búsqueda (solo en la primera carga)
      if (page === 1 && this.allPendientes.length === 0) {
        this.loadAllPendientes();
      }
    });
  }

  loadAllPendientes() {
    // Cargar todas las páginas de usuarios pendientes para búsqueda
    this.usuariosService.getPendientes(1).subscribe((data: any) => {
      this.allPendientes = data.usuarios;
      
      // Si hay más páginas, cargar las siguientes
      if (data.pages > 1) {
        for (let i = 2; i <= data.pages; i++) {
          this.usuariosService.getPendientes(i).subscribe((pageData: any) => {
            this.allPendientes = this.allPendientes.concat(pageData.usuarios);
          });
        }
      }
    });
  }

  searchPendientes() {
    if (this.searchTerm.trim() === '') {
      this.isSearching = false;
      this.loadPendientes(1);
      return;
    }

    this.isSearching = true;
    
    // Filtrar por nombre y apellido
    this.arrayPendientes = this.allPendientes.filter((usuario: any) => {
      const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
      const searchLower = this.searchTerm.toLowerCase();
      
      return nombreCompleto.includes(searchLower);
    });
    
    this.currentPage = 1;
    this.totalPaginas = 1;
    this.pages = [1];
  }

  clearSearch() {
    this.searchTerm = '';
    this.isSearching = false;
    this.loadPendientes(1);
  }
}
