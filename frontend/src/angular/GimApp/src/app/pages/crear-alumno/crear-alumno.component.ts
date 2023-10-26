import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {
  createForm!: FormGroup;
  url = '/api'

  constructor (
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
    // datacreate = {nombre: "Abril", apellido: "Freytes", email: "a.f@email.com", contrasena: "hola123"}
    console.log('Registrando nuevo usuario');
    this.http.post(this.url + '/auth/register', this.createForm.value)
    .subscribe(res=>{
      alert("Solicitud de registro exitosa, recibirá una notificación a su mail al ser confirmada");
      this.createForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Error de algun tipo");
  })
}
}


