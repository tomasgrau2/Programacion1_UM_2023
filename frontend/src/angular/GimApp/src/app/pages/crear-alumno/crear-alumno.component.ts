import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {
  createForm!: FormGroup;
  // url = '/api'
  user_data:any = ''



  constructor (
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
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
      
      
      console.log(typeof this.user_data["id"])
    
      alert("Registro exitoso, creando alumno...");
      this.asignarRol(this.user_data,"alumno")
      this.crearAlumno(this.user_data.id)

      this.createForm.reset();
    },error=>{
      alert("Error de algun tipo");
    });
  }



  asignarRol(usuario: any, rol: string) {
    this.usuariosService.putRol(usuario.id, rol).subscribe(
      (response) => {
        console.log(`Rol ${rol} asignado al usuario ${usuario.nombre}`);
      },
      (error) => {
        console.log('Error al asignar rol:', error);
      }
    );
  }

  crearAlumno(userID: number) {
    this.usuariosService.postAlumnos(userID).subscribe(
      (response) => {
        console.log("Al crear alumno: ", response)
        console.log(`Alumno creado`);
      },
      (error) => {
        console.log('Error al crear alumno:', error);
      }
    );
  }

  
}



