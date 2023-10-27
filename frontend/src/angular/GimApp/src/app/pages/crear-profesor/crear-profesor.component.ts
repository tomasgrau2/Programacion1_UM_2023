import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css']
})
export class CrearProfesorComponent {
  createForm!: FormGroup;
  user_data:any = ''

  constructor (
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private http : HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      contrasena: ['', Validators.required],
      edad: ['', Validators.required],
      dni: ['', Validators.required],
    })
  }
  createUser(dataLogin:any = {}) {
    console.log('Registrando nuevo usuario');
    console.log(this.createForm.value)
    this.usuariosService.postUsers(this.createForm.value)  
    .subscribe(response => {
      this.user_data = response // Guardo la informacion del nuevo usuario para asignarle el 
      
      console.log(this.user_data.id)
      this.asignarRol(this.user_data.id,"profesor")
    
      alert("Registro exitoso, creando profesor...");


      const email = this.createForm['controls']['email'].value;  // Devolver el email para crear el profesor
      console.log(email)
      this.createForm.reset();
    },error=>{
      alert("Error de algun tipo");
    })
  }
  asignarRol(usuario: any, rol: string) {
    this.usuariosService.putRol(usuario, rol).subscribe(
      (response) => {
        console.log(`Rol ${rol} asignado al usuario ${usuario.nombre}`);
      },
      (error) => {
        console.log('Error al asignar rol:', error);
      }
    );
  }

}
