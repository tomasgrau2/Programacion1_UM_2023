import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/home/login/login.component';
import { StartComponent } from './pages/home/start/start.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomealumnosComponent } from './pages/alumno/homealumnos/homealumnos.component';
import { HomeadminComponent } from './pages/admin/homeadmin/homeadmin.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersAdminComponent } from './pages/admin/users-admin/users-admin.component';
import { ListaAlumnosComponent } from './pages/admin/lista-alumnos/lista-alumnos.component';
import { CrearAlumnoComponent } from './pages/crear-alumno/crear-alumno.component';
import { CrearProfesorComponent } from './pages/crear-profesor/crear-profesor.component';
import { EditAlumnoComponent } from './pages/edit-alumno/edit-alumno.component';
import { EditPerfilComponent } from './pages/edit-perfil/edit-perfil.component';
import { EditProfeComponent } from './pages/edit-profe/edit-profe.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListaProfesoresComponent } from './pages/admin/lista-profesores/lista-profesores.component';
import { HomeprofesoresComponent } from './pages/profesor/homeprofesores/homeprofesores.component';
import { PerfilVistaProfComponent } from './pages/profesor/perfil-vista-prof/perfil-vista-prof.component';
import { PlanificacionesProfesoresComponent } from './pages/profesor/planificaciones-profesores/planificaciones-profesores.component';
import { InfoAlumnoComponent } from './pages/profesor/info-alumno/info-alumno.component';
import { ListaPendientesComponent } from './pages/admin/lista-pendientes/lista-pendientes.component';
import { PlanificacionesAdminComponent } from './pages/admin/planificaciones-admin/planificaciones-admin.component';
import { authsessionAlumnoGuard } from './guards/authsession-alumno.guard';
import { authsessionProfesorGuard } from './guards/authsession-profesor.guard';
import { authsessionAdminGuard } from './guards/authsession-admin.guard';
import { authsessionProfAlumnoGuard } from './guards/authsession-prof-alumno.guard';
import { authsessionProfAdminGuard } from './guards/authsession-prof-admin.guard';

const routes: Routes = [
  { path: '', component : StartComponent},
  { path: 'login', component : LoginComponent},
  { path: 'start', component : StartComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'error_page', component: ErrorPageComponent},
  { path: 'home_alumnos', component: HomealumnosComponent, canActivate:[authsessionAlumnoGuard]},
  { path: 'home_admin' , component : HomeadminComponent, canActivate:[authsessionAdminGuard]},
  { path: 'settings', component: SettingsComponent},
  { path: 'users_admin', component: UsersAdminComponent, canActivate:[authsessionAdminGuard]},
  { path: 'lista_alumnos', component: ListaAlumnosComponent, canActivate:[authsessionProfAdminGuard]},
  { path: 'crear_alumno', component: CrearAlumnoComponent, canActivate:[authsessionAdminGuard]},
  { path: 'crear_profesor', component: CrearProfesorComponent, canActivate:[authsessionAdminGuard]},
  { path: 'edit_alumno', component: EditAlumnoComponent, canActivate:[authsessionAdminGuard]},
  { path: 'edit_perfil', component: EditPerfilComponent},
  { path: 'edit_profesor', component: EditProfeComponent, canActivate:[authsessionAdminGuard]},
  { path: 'perfil', component: PerfilComponent, canActivate:[authsessionProfAlumnoGuard]},
  { path: 'lista_profesores', component: ListaProfesoresComponent, canActivate:[authsessionAdminGuard]},
  { path: 'home_profesores' , component : HomeprofesoresComponent, canActivate:[authsessionProfesorGuard]},
  { path: 'perfil_vista_prof', component: PerfilVistaProfComponent, canActivate:[authsessionProfesorGuard]},
  { path: 'planificacion_profesores', component: PlanificacionesProfesoresComponent, canActivate:[authsessionProfesorGuard]},
  { path: 'info_alumno', component: InfoAlumnoComponent, canActivate:[authsessionProfesorGuard]},
  { path: 'lista_pendientes', component: ListaPendientesComponent, canActivate:[authsessionAdminGuard]},
  { path: 'planificaciones_admin', component: PlanificacionesAdminComponent, canActivate:[authsessionAdminGuard]},
  { path: '**', redirectTo: 'error_page'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
