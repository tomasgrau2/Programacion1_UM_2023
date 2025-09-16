import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.obtenerNombreUsuario();
  }

  obtenerNombreUsuario() {
    this.usuariosService.getUsuarioActual().subscribe({
      next: (response: any) => {
        console.log('Respuesta del servicio getUsuarioActual:', response);
        const nombre = response.nombre || response.name || '';
        const apellido = response.apellido || response.lastname || response.surname || '';
        
        if (nombre && apellido) {
          this.nombreUsuario = `${nombre} ${apellido}`;
        } else if (nombre) {
          this.nombreUsuario = nombre;
        } else {
          this.nombreUsuario = 'Usuario';
        }
      },
      error: (error) => {
        console.error('Error al obtener usuario actual:', error);
        this.nombreUsuario = 'Usuario';
      }
    });
  }

  cerrarSesion() {
    this.authService.logout();
  }

}
