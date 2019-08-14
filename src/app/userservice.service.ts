import { Injectable } from '@angular/core';
//Librerias Firebase
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

//import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
//Servicio encargado de consulta y actualizacion de usuarios
export class UserserviceService {

  constructor(
    //variable Base de datos FireBase
    public db: AngularFirestore,
    //variable Autenticaion
    public afAuth: AngularFireAuth
  ) { }

  //Metodo que retorna la informacion el usuario autenticado
  getCurrentUser() {
    //Promesa: tarea asincronica, si obtiene el usuario lo retorna, sino retorna cadena con error
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }
  
  //Metodo que retorna el usuario actualizado
  updateCurrentUser(value) {
    //Promesa: si obtine y actualiza el usuario lo retorna, so no error
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
}
