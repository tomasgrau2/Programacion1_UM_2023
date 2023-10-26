import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css']
})
export class ListaProfesoresComponent {
  usuarios: any[] = [];
  arrayProfesores: any;
  currentPage:any = 1;
  totalPaginas: number = 0;
  pages: number[] = [];

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
    });
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

