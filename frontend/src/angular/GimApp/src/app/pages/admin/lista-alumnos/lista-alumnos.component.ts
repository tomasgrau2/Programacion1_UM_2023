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
    });
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

