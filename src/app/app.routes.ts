//importacion para navegacion
import { Routes, RouterModule } from '@angular/router';
import {enableProdMode} from '@angular/core';

//importaciones componentes
import { LoginComponentComponent } from './login-component/login-component.component'
import { UserComponentComponent } from './user-component/user-component.component'
import { RegisterComponentComponent } from './register-component/register-component.component';
import { TablaCandadosComponent } from './tabla-candados/tabla-candados.component'
import { UserResolver } from './user-component/user.resolver';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { TablaCandadosInfoComponent } from './tabla-candados-info/tabla-candados-info.component';
import { AdminCandadoComponent } from './admin-candado/admin-candado.component'
import { UserRegisterComponent } from './user-register/user-register.component'


// Importacion de servicio de autoguardado
import { AuthguardService } from './authguard.service';
enableProdMode(); 

//path de navegacion y direccionamiento a su respectivo componente
export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent, canActivate: [AuthguardService] },
  { path: 'register', component: RegisterComponentComponent, resolve: {data: UserResolver} },
  { path: 'register1', component: RegisterComponentComponent,resolve: {data: UserResolver}},
  { path: 'register2', component: UserRegisterComponent,resolve: {data: UserResolver}},
  { path: 'user', component: UserComponentComponent, resolve: {data: UserResolver}},
  { path: 'candados', component: TablaCandadosComponent, resolve: {data: UserResolver}},
  { path: 'listaUsuario', component: ListaUsuariosComponent, resolve: {data: UserResolver}},
  { path: 'candados1', component: TablaCandadosInfoComponent, resolve: {data: UserResolver}},
  { path: 'admin', component: AdminCandadoComponent, resolve: {data: UserResolver}}
];
 