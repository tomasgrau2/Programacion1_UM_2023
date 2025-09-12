import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css']
})
export class EditPerfilComponent implements OnInit {
  usuario: any = {};
  loading = true;

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.usuariosService.getUsuarioActual().subscribe({
      next: (response: any) => {
        this.usuario = response;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar datos del usuario:', error);
        this.loading = false;
      }
    });
  }

  guardarCambios(): void {
    this.loading = true;
    
    // Preparar solo los campos que se pueden actualizar
    const datosActualizacion = {
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      email: this.usuario.email,
      edad: this.usuario.edad
    };
    
    this.usuariosService.updateUsuarioActual(datosActualizacion).subscribe({
      next: (response: any) => {
        console.log('Datos actualizados correctamente:', response);
        this.loading = false;
        // Aquí podrías mostrar un mensaje de éxito
        alert('Perfil actualizado correctamente');
      },
      error: (error: any) => {
        console.error('Error al actualizar datos del usuario:', error);
        this.loading = false;
        // Aquí podrías mostrar un mensaje de error
        alert('Error al actualizar el perfil');
      }
    });
  }
}
