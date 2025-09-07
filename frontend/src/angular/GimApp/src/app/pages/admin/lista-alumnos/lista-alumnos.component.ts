import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit{

  usuarios: any[] = [];
  arrayAlumnos: any;
  currentPage:any = 1;
  totalPaginas: number = 0;
  pages: number[] = [];
  searchTerm: string = '';
  isSearching: boolean = false;
  allAlumnos: any[] = []; // Para almacenar todos los alumnos para búsqueda

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.loadAlumnos(this.currentPage);
  }

  get rol() {
    return localStorage.getItem('rol');
  }

  loadAlumnos(page: any) {
    this.usuariosService.getAlumnos(page).subscribe((data: any) => {
      this.arrayAlumnos = data.usuarios;
      this.currentPage = data.page;
      this.totalPaginas = data.pages;
      console.log('Pagina actual:', this.currentPage);
      console.log('JSON data:', this.arrayAlumnos);
      console.log('Total de paginas:', this.totalPaginas);

      this.pages = Array.from({length: this.totalPaginas}, (_, i) => i + 1);
      
      // Cargar todos los alumnos para búsqueda (solo en la primera carga)
      if (page === 1 && this.allAlumnos.length === 0) {
        this.loadAllAlumnos();
      }
    });
  }

  loadAllAlumnos() {
    // Cargar todas las páginas de alumnos para búsqueda
    this.usuariosService.getAlumnos(1).subscribe((data: any) => {
      this.allAlumnos = data.usuarios;
      
      // Si hay más páginas, cargar las siguientes
      if (data.pages > 1) {
        for (let i = 2; i <= data.pages; i++) {
          this.usuariosService.getAlumnos(i).subscribe((pageData: any) => {
            this.allAlumnos = this.allAlumnos.concat(pageData.usuarios);
          });
        }
      }
    });
  }

  searchAlumnos() {
    if (this.searchTerm.trim() === '') {
      this.isSearching = false;
      this.loadAlumnos(1);
      return;
    }

    this.isSearching = true;
    
    // Filtrar por nombre y apellido
    this.arrayAlumnos = this.allAlumnos.filter((alumno: any) => {
      const nombreCompleto = `${alumno.nombre} ${alumno.apellido}`.toLowerCase();
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
    this.loadAlumnos(1);
  }


  eliminarAlumno(userId: number) {
    this.usuariosService.deleteUser(userId).subscribe(
      (response) => {
        console.log('Usuario eliminado con éxito', userId);
        // Actualizar lista
        const index = this.arrayAlumnos.findIndex((usuario: { id: number; }) => usuario.id === userId);
        if (index !== -1) {
        this.arrayAlumnos.splice(index, 1);
      }
    }
    );
  }
}

