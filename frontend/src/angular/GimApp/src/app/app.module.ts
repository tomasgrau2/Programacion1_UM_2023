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
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { EditUsersComponent } from './pages/edit-users/edit-users.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PlanificacionesProfesoresComponent } from './pages/planificaciones-profesores/planificaciones-profesores.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FondoComponent } from './components/fondo/fondo.component';
import { FooterComponent } from './components/footer/footer.component';

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
    ListUsersComponent,
    EditUsersComponent,
    PerfilComponent,
    PlanificacionesProfesoresComponent,
    NavComponent,
    ErrorPageComponent,
    FondoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
