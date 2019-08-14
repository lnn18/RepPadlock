//importacion para navegacion
import { Routes } from '@angular/router';

//importaciones componentes
import { LoginComponentComponent } from './login-component/login-component.component'
import { UserComponentComponent } from './user-component/user-component.component'
import { RegisterComponentComponent } from './register-component/register-component.component';
import { UserResolver } from './user-component/user.resolver';

// Importacion de servicio de autoguardado
import { AuthguardService } from './authguard.service';

//path de navegacion y direccionamiento a su respectivo componente
export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent, canActivate: [AuthguardService] },
  { path: 'register', component: RegisterComponentComponent, canActivate: [AuthguardService] },
  { path: 'user', component: UserComponentComponent,  resolve: { data: UserResolver}}
];