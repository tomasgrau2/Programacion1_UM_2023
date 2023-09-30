import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './pages/start/start.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeadminComponent } from './pages/homeadmin/homeadmin.component';
import { HomealumnosComponent } from './pages/homealumnos/homealumnos.component';
import { HomeprofesoresComponent } from './pages/homeprofesores/homeprofesores.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersAdminComponent } from './pages/users-admin/users-admin.component';
import { PlanificacionComponent } from './pages/planificacion/planificacion.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PlanificacionesProfesoresComponent } from './pages/planificaciones-profesores/planificaciones-profesores.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FondoComponent } from './components/fondo/fondo.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditProfeComponent } from './pages/edit-profe/edit-profe.component';
import { EditAlumnoComponent } from './pages/edit-alumno/edit-alumno.component';
import { EditPerfilComponent } from './pages/edit-perfil/edit-perfil.component';
import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos.component';
import { CrearAlumnoComponent } from './pages/crear-alumno/crear-alumno.component';
import { CrearProfesorComponent } from './pages/crear-profesor/crear-profesor.component';
import { ListaProfesoresComponent } from './pages/lista-profesores/lista-profesores.component';
import { PerfilVistaProfComponent } from './pages/perfil-vista-prof/perfil-vista-prof.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { NavProfesorComponent } from './components/nav-profesor/nav-profesor.component';
import { PerfilProfesorComponent } from './pages/perfil-profesor/perfil-profesor.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { InfoAlumnoComponent } from './pages/info-alumno/info-alumno.component';


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
    PlanificacionComponent,
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
    ClasesComponent,
    NavUserComponent,
    NavProfesorComponent,
    PerfilProfesorComponent,
    NavAdminComponent,
    InfoAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
