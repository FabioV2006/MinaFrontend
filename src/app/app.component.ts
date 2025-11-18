import { Component } from '@angular/core'; // IMPORTAR COMPONENT
import { RouterModule, RouterOutlet } from '@angular/router'; // IMPORTAR ROUTERMODULE y ROUTEROUTLET
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// Importar los nuevos componentes y la Landing Page
import { VilcaListarComponent } from './component/vilca-listar/vilca-listar.component';
import { VilcaNuevoComponent } from './component/vilca-nuevo/vilca-nuevo.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    VilcaListarComponent,
    VilcaNuevoComponent,
    LandingPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vilca-villanueva-app';
}
