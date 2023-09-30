import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StartComponent } from './pages/start/start.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomealumnosComponent } from './pages/homealumnos/homealumnos.component';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersAdminComponent } from './pages/users-admin/users-admin.component';
import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos.component';
import { CrearAlumnoComponent } from './pages/crear-alumno/crear-alumno.component';
import { CrearProfesorComponent } from './pages/crear-profesor/crear-profesor.component';
import { EditAlumnoComponent } from './pages/edit-alumno/edit-alumno.component';
import { EditPerfilComponent } from './pages/edit-perfil/edit-perfil.component';
import { EditProfeComponent } from './pages/edit-profe/edit-profe.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListaProfesoresComponent } from './pages/lista-profesores/lista-profesores.component';
import { HomeprofesoresComponent } from './/pages/homeprofesores/homeprofesores.component';
import { PerfilVistaProfComponent } from './pages/perfil-vista-prof/perfil-vista-prof.component';
import { PlanificacionComponent } from './pages/planificacion/planificacion.component';
import { PlanificacionesProfesoresComponent } from './pages/planificaciones-profesores/planificaciones-profesores.component';

const routes: Routes = [
  { path: '', component : StartComponent},
  { path: 'login', component : LoginComponent},
  { path: 'start', component : StartComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'error_page', component: ErrorPageComponent},
  { path: 'home_alumnos', component: HomealumnosComponent},
  { path: 'home_admin' , component : HomeadminComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'users_admin', component: UsersAdminComponent},
  { path: 'lista_alumnos', component: ListaAlumnosComponent},
  { path: 'crear_alumno', component: CrearAlumnoComponent},
  { path: 'crear_profesor', component: CrearProfesorComponent},
  { path: 'edit_alumno', component: EditAlumnoComponent},
  { path: 'edit_perfil', component: EditPerfilComponent},
  { path: 'edit_profesor', component: EditProfeComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'lista_profesores', component: ListaProfesoresComponent},
  { path: 'home_profesores' , component : HomeprofesoresComponent},
  { path: 'perfil_vista_prof', component: PerfilVistaProfComponent},
  { path: 'planificacion_profesores', component: PlanificacionesProfesoresComponent},
  { path: 'planificacion', component: PlanificacionComponent},
  { path: '**', redirectTo: 'error_page'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
