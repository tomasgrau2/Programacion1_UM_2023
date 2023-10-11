import { Component, OnInit } from '@angular/core';
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

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.usuariosService.getUsers().subscribe((data: any) => {
      this.arrayUsuarios = data.usuarios;
      console.log('JSON data:', this.arrayUsuarios);

      // Filtrar usuarios con rol "users" y mostrar en la consola
      this.usuariosConRolUsers = this.arrayUsuarios.filter((usuario: { rol: string; }) => usuario.rol === 'users');
      console.log('Usuarios con rol "users":', this.usuariosConRolUsers);
    });
  }
}
