import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './pages/home/start/start.component';
import { LoginComponent } from './pages/home/login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { HomeadminComponent } from './pages/admin/homeadmin/homeadmin.component';
import { HomealumnosComponent } from './pages/alumno/homealumnos/homealumnos.component';
import { HomeprofesoresComponent } from './pages/profesor/homeprofesores/homeprofesores.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersAdminComponent } from './pages/admin/users-admin/users-admin.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PlanificacionesProfesoresComponent } from './pages/profesor/planificaciones-profesores/planificaciones-profesores.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FondoComponent } from './components/fondo/fondo.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditProfeComponent } from './pages/edit-profe/edit-profe.component';
import { EditAlumnoComponent } from './pages/edit-alumno/edit-alumno.component';
import { EditPerfilComponent } from './pages/edit-perfil/edit-perfil.component';
import { ListaAlumnosComponent } from './pages/admin/lista-alumnos/lista-alumnos.component';
import { CrearAlumnoComponent } from './pages/crear-alumno/crear-alumno.component';
import { CrearProfesorComponent } from './pages/crear-profesor/crear-profesor.component';
import { ListaProfesoresComponent } from './pages/admin/lista-profesores/lista-profesores.component';
import { PerfilVistaProfComponent } from './pages/profesor/perfil-vista-prof/perfil-vista-prof.component';
import { InfoAlumnoComponent } from './pages/profesor/info-alumno/info-alumno.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaPendientesComponent } from './pages/admin/lista-pendientes/lista-pendientes.component';
import { PlanificacionesAdminComponent } from './pages/admin/planificaciones-admin/planificaciones-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    RegisterComponent,
    HomeadminComponent,
    HomealumnosComponent,
    HomeprofesoresComponent,
    SettingsComponent,
    UsersAdminComponent,
    PerfilComponent,
    PlanificacionesProfesoresComponent,
    NavComponent,
    ErrorPageComponent,
    FondoComponent,
    FooterComponent,
    EditProfeComponent,
    EditAlumnoComponent,
    EditPerfilComponent,
    ListaAlumnosComponent,
    CrearAlumnoComponent,
    CrearProfesorComponent,
    ListaProfesoresComponent,
    PerfilVistaProfComponent,
    InfoAlumnoComponent,
    ListaPendientesComponent,
    PlanificacionesAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
