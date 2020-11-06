import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { AuthServiceService } from './auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserserviceService } from './userservice.service';
import { AuthguardService } from './authguard.service';
import { rootRouterConfig } from './app.routes';
import { UserResolver } from './user-component/user.resolver';
import { TablaCandadosComponent } from './tabla-candados/tabla-candados.component';
import { CandadoServiceService } from './candado-service.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { TablaCandadosInfoComponent } from './tabla-candados-info/tabla-candados-info.component';
import { AdminCandadoComponent } from './admin-candado/admin-candado.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ListaGruposComponent } from './lista-grupos/lista-grupos.component';
import { GrupoCandadosComponent } from './grupo-candados/grupo-candados.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NuevoCandadoGrupoComponent } from './nuevo-candado-grupo/nuevo-candado-grupo.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    UserComponentComponent,
    TablaCandadosComponent,
    ListaUsuariosComponent,
    TablaCandadosInfoComponent,
    AdminCandadoComponent,
    UserRegisterComponent,
    ListaGruposComponent,
    GrupoCandadosComponent,
    ConfirmDialogComponent,
    NuevoCandadoGrupoComponent  
  ],
  exports: [
    AdminCandadoComponent,
    TablaCandadosInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    DataTablesModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    CommonModule,
    HttpClientModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [AuthServiceService, UserserviceService, UserResolver, AuthguardService,CandadoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
