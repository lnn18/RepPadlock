import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
//importacion del servicio de usuario
import { UserserviceService } from '../app/userservice.service';

@Injectable({
  providedIn: 'root'
})
//Clase para navegacion usuario logeado
export class AuthguardService implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserserviceService,
    //routing para navegacion
    private router: Router
  ) { }

  //"Metodo" para navega y si es exitoso devuelve false sino verdadero
  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(user => {
          this.router.navigate(['/user']);
          return resolve(false);
        }, err => {
          return resolve(true);
        })
    })
  }
}
