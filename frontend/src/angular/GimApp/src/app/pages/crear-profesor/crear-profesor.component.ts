import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.usuariosService.postUsers(this.createForm.value)  
    .subscribe(response => {
      this.user_data = response // Guardo la informacion del nuevo usuario para asignarle el rol y crear el profesor
      alert("Registro exitoso, creando profesor...");
      this.asignarRol(this.user_data,"profesor") // Asigno rol profesor
      // this.crearProfesor(this.user_data.id) // Creo el profesor
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




  crearProfesor(userID: number) {
    this.usuariosService.postProfesores(userID).subscribe(
      (response) => {
        console.log("Al crear profesor: ", response)
        console.log(`Profesor creado`);
      },
      (error) => {
        console.log('Error al crear profesor:', error);
      }
    );
  }

}
