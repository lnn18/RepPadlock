//importacion para navegacion
import { Routes, RouterModule } from '@angular/router';
import {enableProdMode} from '@angular/core';

//importaciones componentes
import { LoginComponentComponent } from './login-component/login-component.component'
import { UserComponentComponent } from './user-component/user-component.component'
import { RegisterComponentComponent } from './register-component/register-component.component';
import {TablaCandadosComponent} from './tabla-candados/tabla-candados.component'
import { UserResolver } from './user-component/user.resolver';
import {UserserviceService} from './userservice.service'

// Importacion de servicio de autoguardado
import { AuthguardService } from './authguard.service';
enableProdMode(); 

//path de navegacion y direccionamiento a su respectivo componente
export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent, canActivate: [AuthguardService] },
  { path: 'register', component: RegisterComponentComponent, canActivate: [AuthguardService] },
  { path: 'register1', component: RegisterComponentComponent},
  { path: 'user', component: UserComponentComponent},
  { path: 'candados', component: TablaCandadosComponent},
];
 