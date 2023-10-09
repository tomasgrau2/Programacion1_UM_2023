import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm!: FormGroup;

  constructor (
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['profesor.profesor@um.edu.ar', Validators.required],
      contrasena: ['profesor123', Validators.required]
    })
  }

  login(dataLogin:any = {}) {
    // dataLogin = {email: "profesor.profesor@um.edu.ar", contrasena: "profesor123"}
    console.log('Comprobando credenciales');
    console.log('Email : ' )
    this.authService.login(dataLogin).subscribe({
      next: (rta:any) => {
        //alert('Login exitoso');
        console.log('Respuesta login: ',rta.access_token);
        const jwtdecoded:any = jwtDecode(rta.access_token);
        const userRole:any = jwtdecoded.rol;
        localStorage.setItem('rol', userRole)
        localStorage.setItem('token', rta.access_token);
        if (userRole) {
          console.log('Rol del usuario:', userRole);
  
          // Aquí puedes tomar acciones en función del rol del usuario
          if (userRole === 'admin') {
            // Redirigir al panel de administración, por ejemplo
            this.router.navigate(['home_admin']);
          } else if (userRole === 'alumno') {
            // Redirigir al panel de alumno, por ejemplo
            this.router.navigate(['home_alumnos']);
          } else if (userRole === 'profesor') {
            // Redirigir al panel de alumno, por ejemplo
            this.router.navigate(['home_profesores']);
          } else {
            // Redirigir a alguna página predeterminada o mostrar un mensaje apropiado
            this.router.navigate(['login']);
          }
        } else {
          console.log('No se pudo obtener el rol del usuario');
        }
      },
      error: (error) => {
        alert('Credenciales incorrectas');
        localStorage.removeItem('token');
      },
      complete: () => {
        console.log('Finalizo');
      }
    })
  }
  submit() {
    if(this.loginForm.valid) {
      console.log('Form login: ',this.loginForm.value);
      this.login(this.loginForm.value)
    } else {
      alert('Formulario invalido');
    }
  }

}
