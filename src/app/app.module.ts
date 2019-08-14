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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    UserComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  providers: [AuthServiceService, UserserviceService, UserResolver, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
