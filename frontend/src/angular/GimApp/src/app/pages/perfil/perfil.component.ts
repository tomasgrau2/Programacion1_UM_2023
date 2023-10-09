import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor(
    private authService: AuthService
  ) {}
  cerrarSesion() {
    this.authService.logout();
  }

}
