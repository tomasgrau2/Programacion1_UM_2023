import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css']
})
export class ListaProfesoresComponent implements OnInit {
  usuarios: any[] = [];
  arrayProfesores: any;
  currentPage:any = 1;
  totalPaginas: number = 0;
  pages: number[] = [];
  searchTerm: string = '';
  isSearching: boolean = false;
  allProfesores: any[] = []; // Para almacenar todos los profesores para búsqueda

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.loadProfesores(this.currentPage);
  }

  get rol() {
    return localStorage.getItem('rol');
  }

  loadProfesores(page: any) {
    this.usuariosService.getProfesores(page).subscribe((data: any) => {
      this.arrayProfesores = data.usuarios;
      this.currentPage = data.page;
      this.totalPaginas = data.pages;
      console.log('Pagina actual:', this.currentPage);
      console.log('JSON data:', this.arrayProfesores);
      console.log('Total de paginas:', this.totalPaginas);

      this.pages = Array.from({length: this.totalPaginas}, (_, i) => i + 1);
      
      // Cargar todos los profesores para búsqueda (solo en la primera carga)
      if (page === 1 && this.allProfesores.length === 0) {
        this.loadAllProfesores();
      }
    });
  }

  loadAllProfesores() {
    // Cargar todas las páginas de profesores para búsqueda
    this.usuariosService.getProfesores(1).subscribe((data: any) => {
      this.allProfesores = data.usuarios;
      
      // Si hay más páginas, cargar las siguientes
      if (data.pages > 1) {
        for (let i = 2; i <= data.pages; i++) {
          this.usuariosService.getProfesores(i).subscribe((pageData: any) => {
            this.allProfesores = this.allProfesores.concat(pageData.usuarios);
          });
        }
      }
    });
  }

  searchProfesores() {
    if (this.searchTerm.trim() === '') {
      this.isSearching = false;
      this.loadProfesores(1);
      return;
    }

    this.isSearching = true;
    
    // Filtrar por nombre y apellido
    this.arrayProfesores = this.allProfesores.filter((profesor: any) => {
      const nombreCompleto = `${profesor.nombre} ${profesor.apellido}`.toLowerCase();
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
    this.loadProfesores(1);
  }

  eliminarProfesor(userId: number) {
    this.usuariosService.deleteUser(userId).subscribe(
      (response) => {
        console.log('Usuario eliminado con éxito', userId);
        // Actualizar lista
        const index = this.arrayProfesores.findIndex((usuario: { id: number; }) => usuario.id === userId);
        if (index !== -1) {
        this.arrayProfesores.splice(index, 1);
      }
    }
    );
  }
}

