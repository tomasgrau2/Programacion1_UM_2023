import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(
    private authService: AuthService
  ) {}

  get isToken() {
    return localStorage.getItem('token');
  }
  
  get rol() {
    return localStorage.getItem('rol');
  }



  cerrarSesion() {
    this.authService.logout();
  }

}
