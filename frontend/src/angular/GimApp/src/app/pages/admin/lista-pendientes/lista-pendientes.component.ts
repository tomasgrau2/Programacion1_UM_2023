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

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.loadPendientes(this.currentPage); 
  }

  asignarRol(usuario: any, rol: string) {
    this.usuariosService.putRol(usuario.id, rol).subscribe(
      (response) => {
        console.log(`Rol ${rol} asignado al usuario ${usuario.nombre}`);
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
    });
  }
}
