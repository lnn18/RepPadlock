import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCandadoComponent } from './admin-candado/admin-candado.component';


const routes: Routes = [
  {path: 'admin/:nombre', component: AdminCandadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
