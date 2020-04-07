import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {FormControl, FormGroup} from "@angular/forms";
//import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
//
export class AuthServiceService {
  private user: Observable<firebase.User | null >;

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user=this.afAuth.authState;
   }

   form = new FormGroup ({         
    nombre: new FormControl (''), 
    IMEI: new FormControl (''), 
    tipoId: new FormControl (''), 
    id: new FormControl (''),    
    telefono: new FormControl (''),   
    perfil: new FormControl(''),
    idCiudad: new FormControl(''),
    entidad: new FormControl('')

}) 
  

  //Metodo login facebook
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }


  //metodo registro usuario y cotraseña
  doRegister(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  //metodo login usuario y contraseña
  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  //Cierre de sesion firebase
  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      }
      else {
        reject();
      }
    });
  }

  // Obtener el estado de autenticación
  get authenticated():boolean {
    return this.user != null; // True ó False
  }
// Obtener el observador del usuario actual
  get currentUser(): Observable<firebase.User | null> {
    return this.user;
  }
   // Recuperar contraseña
  resetPassword(email): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }
  // Verificar correo
  verifyEmail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }
  // Finalizar sesión
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
  //Método para crear usuarios en firebase 
  createUser(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore.collection("usuario")
            .add(data)
            .then(res => {}, err => reject(err));
    });
}
}
