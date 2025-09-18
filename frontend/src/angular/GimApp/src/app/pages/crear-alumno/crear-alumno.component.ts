import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {
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
      nro_socio: ['', [Validators.required, this.nroSocioValidator]],
    })
    
  }

  // Validador personalizado para el número de socio
  nroSocioValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Dejamos que el required se encargue de esto
    }
    
    // Patrón: SOC-XXXX donde XXXX son 4 dígitos
    const pattern = /^SOC-\d{4}$/;
    if (!pattern.test(value)) {
      return { nroSocioFormat: true };
    }
    
    return null;
  }

  // Getter para acceder fácilmente a los errores del formulario
  get nroSocioError() {
    const nroSocioControl = this.createForm.get('nro_socio');
    if (nroSocioControl?.errors?.['nroSocioFormat']) {
      return 'El número de socio debe tener el formato SOC-XXXX (ej: SOC-0001)';
    }
    return null;
  }

  // Generar número de socio automáticamente
  generateNroSocio() {
    // Generar un número aleatorio entre 1 y 9999
    const randomNumber = Math.floor(Math.random() * 9999) + 1;
    const nroSocio = `SOC-${randomNumber.toString().padStart(4, '0')}`;
    this.createForm.patchValue({ nro_socio: nroSocio });
  }

  createUser(dataLogin:any = {}) {
    console.log('Registrando nuevo usuario');
    this.usuariosService.postUsers(this.createForm.value)  
    .subscribe({
      next: (response) => {
        this.user_data = response // Guardo la informacion del nuevo usuario para asignarle el rol y crear el alumno
        alert("Registro exitoso, creando alumno...");
        this.asignarRol(this.user_data,"alumno") // Asigno rol alumno
        this.crearAlumno(this.user_data.id) // Creo el alumno
        this.createForm.reset();
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        if (error.status === 409) {
          alert(`Error: ${error.error.message || 'El email ya está registrado'}`);
        } else {
          alert(`Error al crear usuario: ${error.error.message || 'Error desconocido'}`);
        }
      }
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
    const alumnoData = {
      id_usuario: userID,
      nro_socio: this.createForm.value.nro_socio
    };
    
    this.usuariosService.postAlumnos(userID, alumnoData.nro_socio).subscribe({
      next: (response) => {
        console.log("Al crear alumno: ", response)
        console.log(`Alumno creado con número de socio: ${alumnoData.nro_socio}`);
        alert(`Alumno creado exitosamente con número de socio: ${alumnoData.nro_socio}`);
      },
      error: (error) => {
        console.error('Error al crear alumno:', error);
        if (error.status === 409) {
          alert(`Error: ${error.error.message || 'El número de socio ya está en uso'}`);
        } else {
          alert(`Error al crear alumno: ${error.error.message || 'Error desconocido'}`);
        }
      }
    });
  }

  
}



