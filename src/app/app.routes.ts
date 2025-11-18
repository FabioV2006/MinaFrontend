import { Routes } from '@angular/router';
import { PacientesComponent } from './component/pacientes/pacientes.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { RegistroComponent } from './component/registro/registro.component';

export const routes: Routes = [
      { path: '', component: LandingPageComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'registro', component: RegistroComponent }
];
