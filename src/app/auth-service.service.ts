import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { param } from 'jquery';
//import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
//
export class AuthServiceService {
  private user: Observable<firebase.User | null >;
  mensaje: string = '';

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user=this.afAuth.authState;
   }

   form = new FormGroup ({    
    IMEI: new FormControl ('', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(15)
    ]), 
    entidad: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
    ]),
    id: new FormControl ('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    idCiudad: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    nombre: new FormControl ('', [
      Validators.required,
      Validators.minLength(4)
    ]), 
    perfil: new FormControl('TuCmJa3tPzkHEocAW0S8', [
      Validators.required,
      Validators.minLength(3)
    ]),
    telefono: new FormControl ('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    tipoId: new FormControl ('', [
      Validators.required,
      Validators.minLength(3)
    ])    

}) 

  form1 = new FormGroup ({         
    IMEI_1: new FormControl (''),
    IMEI_2: new FormControl (''), 
    IMEI_3: new FormControl ('')

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

  updateCollectionCandado(idDoc, parameter, value){
    let mensaje_res = ''

    if(parameter == 'IMEI_1'){
      let registerCollection = this.firestore.collection('candado').doc(idDoc)
      registerCollection.update({
        IMEI_1: value
      }).then(function() {
        console.log('Parametro actualizado correctamente : ',value, ' idDoc : ',idDoc);
        //this.mensaje = this.mensaje + '- Parametro IMEI_1 actualizado correctamente - \n';
      }).catch(function(error) {
        // this.mensaje = this.mens6his.firestore.collection('candado').doc(idDoc)
      })
    }      
      
    if(parameter == 'IMEI_2'){
      let registerCollection = this.firestore.collection('candado').doc(idDoc)
      registerCollection.update({
        IMEI_2: value
      }).then(function() {
        console.log('Parametro actualizado correctamente : ',value, ' idDoc : ',idDoc)
        mensaje_res = '- Parametro IMEI_2 actualizado correctamente';
      }).catch(function(error) {
        mensaje_res = '- ERROR actualizando parametro IMEI_2 - \n';
        console.log('Error actualizando documento : ', parameter)
      })
    }

    if(parameter == 'IMEI_3'){
      let registerCollection = this.firestore.collection('candado').doc(idDoc)
      registerCollection.update({
        IMEI_3: value
      }).then(function() {
        console.log('Parametro actualizado correctamente : ',value, ' idDoc : ',idDoc)
        // this.mensaje = this.mensaje + '- Parametro IMEI_3 actualizado correctamente - \n'
      }).catch(function(error) {
        console.log('Error actualizando documento : ', parameter)
        // this.mensaje = this.mensaje + '- ERROR actualizando parametro IMEI_3 - \n'
      })
    }

    if(parameter == 'idEstacion'){
      let registerCollection = this.firestore.collection('candado').doc(idDoc)
      registerCollection.update({
        idEstacion: value
      }).then(function() {
        console.log('Parametro actualizado correctamente : ',value, ' idDoc : ',idDoc)
        // this.mensaje = this.mensaje + '- Parametro ESTACION actualizado correctamente - \n'
      }).catch(function(error) {
        this.mensaje = this.mensaje + '- ERROR actualizando parametro ESTACION - \n'
        // console.log('Error actualizando documento : ', parameter)
      })
    }
    console.log('Mensaje salida : ',mensaje_res)
    return mensaje_res

  }

  //Método para crear usuarios en firebase
  updateCandado(data1, idEst, candado) {
    let mensaje_resp = ''
    console.log('Llamado correcto a función auth', data1['IMEI_2'], ' Id estacion : ', idEst, ' idCandado : ', candado)
    if(data1['IMEI_1'] != ''){
      console.log('Cambio en IMEI_1 : ',data1['IMEI_1']);
      this.updateCollectionCandado(candado, 'IMEI_1', data1['IMEI_1']);
    }
    if(data1['IMEI_2'] != ''){
      console.log('Cambio en IMEI_2 : ',data1['IMEI_2']);
      mensaje_resp = this.updateCollectionCandado(candado, 'IMEI_2', data1['IMEI_2']);

    }
    if(data1['IMEI_3'] != ''){
      console.log('Cambio en IMEI_3 : ',data1['IMEI_3']);
      this.updateCollectionCandado(candado, 'IMEI_3', data1['IMEI_3']);
    }
    if(idEst != ''){
      console.log('Cambio en estación : ', idEst);
      this.updateCollectionCandado(candado, 'idEstacion', idEst);
    }

    return 'Registro actualizado correctamente'
    // if(data1)  
    //this.firestore.doc('candado/' + ID).update(data1);
    //RETURN  RETORNAR CADENA CON LOS CAMPOS QUE SE HAYAN ACTUALIZADO, LIGADO A UN PROMISE LA CONCATENACIÓN DE LA CADENA
  }

}
