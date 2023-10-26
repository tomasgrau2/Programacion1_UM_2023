import { Component, OnInit, getModuleFactory } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-pendientes',
  templateUrl: './lista-pendientes.component.html',
  styleUrls: ['./lista-pendientes.component.css']
})
export class ListaPendientesComponent implements OnInit {
  usuarios: any[] = [];
  arrayUsuarios: any;
  usuariosConRolUsers: any[] = []; // Aquí almacenarás los usuarios con rol "users"
  totalPaginas: number = 0;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.usuariosService.getPendientes().subscribe((data: any) => {
      this.arrayUsuarios = data.usuarios;
      this.totalPaginas = data.pages;
      console.log('JSON data:', this.arrayUsuarios);
    });
    
  }

  asignarRol(usuario: any, rol: string) {
    this.usuariosService.putRol(usuario.id, rol).subscribe(
      (response) => {
        console.log(`Rol ${rol} asignado al usuario ${usuario.nombre}`);
        // Actualizar lista
        const index = this.arrayUsuarios.findIndex((u: { id: number; }) => u.id === usuario.id);
        if (index !== -1) {
        this.arrayUsuarios.splice(index, 1);
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
        const index = this.arrayUsuarios.findIndex((usuario: { id: number; }) => usuario.id === userId);
        if (index !== -1) {
        this.arrayUsuarios.splice(index, 1);
      }
    }
    );
  }
}
