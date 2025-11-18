import { Routes } from '@angular/router';
// Importar los nuevos componentes
import { VilcaListarComponent } from './component/vilca-listar/vilca-listar.component';
import { VilcaNuevoComponent } from './component/vilca-nuevo/vilca-nuevo.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  // Rutas solicitadas con el apellido paterno "vilca" (C01 - Punto 8 y C03 - Punto 4)
  { path: 'vilca/listado', component: VilcaListarComponent },
  { path: 'vilca/nuevo', component: VilcaNuevoComponent }
];
