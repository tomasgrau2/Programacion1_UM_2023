import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StartComponent } from './pages/start/start.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomealumnosComponent } from './pages/homealumnos/homealumnos.component';

const routes: Routes = [
  { path: '', component : StartComponent},
  { path: 'login', component : LoginComponent},
  { path: 'start', component : StartComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'error_page', component: ErrorPageComponent},
  { path: 'home_alumnos', component: HomealumnosComponent}
  // { path: '**', redirectTo: 'error_page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
