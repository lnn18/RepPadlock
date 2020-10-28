import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import {Observable} from 'rxjs';
import { Subject } from 'rxjs';
import * as firebase from 'firebase/app';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { param } from 'jquery';
import { CandadoServiceService } from './candado-service.service';
import { async } from '@angular/core/testing';
//import { ConsoleReporter } from 'jasmine';
// import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
//
export class AuthServiceService {
  private user: Observable<firebase.User | null >;
  nombreCand : string = '';
  private enviarNombreSubject = new Subject<string>();
  enviarNombreObservable = this.enviarNombreSubject.asObservable();
  



  
  mensaje: string = '';
  imeis: any[] = [];
  Ciudades: any[] = [];
  idCiudades: any[] = [];
  flagImei: boolean = false;

  constructor(
    public imeiUser: CandadoServiceService,
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
  
  enviarNombre(nombreCand: string){
    this.nombreCand = nombreCand;
    this.enviarNombreSubject.next(nombreCand);  
    }
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
  validarImei (imei: string) {

//     this.imeiUser.getCiudades().subscribe(response =>{ 
//       this.Ciudades = [];
//       this.idCiudades = [];
      
//       for (let order of response) {
//         this.idCiudades.push(order.payload.doc.id)
//         this.Ciudades.push(order.payload.doc.data()['nombreCiudad']);
//       }
//       // console.log('las ciudades :', this.Ciudades, this.idCiudades);
    
//   }, error => {
//   });
//   this.imeiUser.getCiudades().subscribe(response =>{ 
//     this.Ciudades = [];
//     this.idCiudades = [];
    
//     for (let order of response) {
//       this.idCiudades.push(order.payload.doc.id)
//       this.Ciudades.push(order.payload.doc.data()['nombreCiudad']);
//     }
//     // console.log('las ciudades :', this.Ciudades, this.idCiudades);
  
// }, error => {
// });
//      console.log('Ciudades desde auth : ',this.Ciudades)
    // //CONSULTA NO PROMESA
    // this.imeiUser.imeiValidateNP(imei).subscribe(
    //   response => {
    //     this.imeis = [];
    //     for (let order of response) {
    //       //this.imeis.push(order.payload.doc.id)
    //       this.imeis.push(order.payload.doc.data()['nombre']);
    //       console.log('Imei leido auth : ', this.imeis)
    //       if(this.imeis.length != 0){
    //         console.log('flag true')
    //         this.flagImei = true;
    //       }else{
    //         console.log('flag false')
    //         this.flagImei = false;
    //       }
    //       console.log('Flag imei : ', this.flagImei)
    //       return this.flagImei; 
    //     }
    //   }
    // )

    // CONSULTA CON PROMESA
    this.imeiUser.imeiValidate(imei)
    .then(async response => {
          this.imeis = [];
          let responses = [response]
          for (let order of responses) {
            //this.imeis.push(order.payload.doc.id)
            this.imeis.push([order]);
            // this.imeis.push(order.payload.doc.data()['nombre']);
          }
          console.log('Imeis en Admin - promise candado : ', this.imeis)
          if(this.imeis.length != 0){
            console.log('flag true')
            this.flagImei = true;
          }else{
            console.log('flag false')
            this.flagImei = false;
          }
    
        }, err => {
          // console.log(err);
          this.mensaje = err.message;
          //this.successMessage = "";
         }
    )

    return this.flagImei;
    //console.log('Imei leido : ', this.imeis)
    //AGREGAR CONDICIÓN DE VALIDACIÓN
    //AGREGAR UN RETURN BOOLEAN

    

  }

  //Método para crear usuarios en firebase
  updateCandado(data1, idEst, candado) {
    let mensaje_resp = ''
    let imei_bool: boolean = false;
    console.log('Llamado correcto a función auth', data1['IMEI_2'], ' Id estacion : ', idEst, ' idCandado : ', candado)
    if(data1['IMEI_1'] != ''){
      console.log('Cambio en IMEI_1 : ',data1['IMEI_1']);
      this.imeiUser.imeiValidateNP(data1['IMEI_1']).subscribe(
        response => {
          this.imeis = [];
          console.log('bandera -in')
          for (let order of response) {
            //this.imeis.push(order.payload.doc.id)
            this.imeis.push(order.payload.doc.data()['nombre']);
            console.log('Imei leido auth : ', this.imeis)
            if(this.imeis.length != 0){
              console.log('flag true')
              this.flagImei = true;
              this.updateCollectionCandado(candado, 'IMEI_1', data1['IMEI_1']);
              console.log('En consulta acutalizado imei usuario : ', this.imeis[0] )
            }else{
              console.log('flag false')
              console.log('No existe usuario con imei : ', data1['IMEI_1'] )
              this.flagImei = false;
              mensaje_resp = 'No existe usuario'
            }
            console.log('Flag imei : ', this.flagImei)
            
          }
        }
      )
      //imei_bool = this.validarImei(data1['IMEI_1']);
      // if()
      
    }
    if(data1['IMEI_2'] != ''){
      console.log('Cambio en IMEI_2 : ',data1['IMEI_2']);
      this.imeiUser.imeiValidateNP(data1['IMEI_2']).subscribe(
        response => {
          this.imeis = [];
          console.log('bandera -in')
          for (let order of response) {
            //this.imeis.push(order.payload.doc.id)
            this.imeis.push(order.payload.doc.data()['nombre']);
            console.log('Imei leido auth : ', this.imeis)
            if(this.imeis.length != 0){
              console.log('flag true')
              this.flagImei = true;
              this.updateCollectionCandado(candado, 'IMEI_2', data1['IMEI_2']);
              console.log('En consulta acutalizado imei usuario : ', this.imeis[0] )
            }else{
              console.log('flag false')
              console.log('No existe usuario con imei : ', data1['IMEI_2'] )
              this.flagImei = false;
              mensaje_resp = 'No existe usuario'
            }
            console.log('Flag imei : ', this.flagImei)
            
          }
        }
      )
      

    }
    if(data1['IMEI_3'] != ''){
      console.log('Cambio en IMEI_3 : ',data1['IMEI_3']);
          //CONSULTA NO PROMESA
      this.imeiUser.imeiValidateNP(data1['IMEI_3']).subscribe(
        response => {
          this.imeis = [];
          console.log('bandera -in')
          for (let order of response) {
            //this.imeis.push(order.payload.doc.id)
            this.imeis.push(order.payload.doc.data()['nombre']);
            console.log('Imei leido auth : ', this.imeis)
            if(this.imeis.length != 0){
              console.log('flag true')
              this.flagImei = true;
              this.updateCollectionCandado(candado, 'IMEI_3', data1['IMEI_3']);
              console.log('En consulta acutalizado imei usuario : ', this.imeis[0] )
            }else{
              console.log('flag false')
              console.log('No existe usuario con imei : ', data1['IMEI_3'] )
              this.flagImei = false;
              mensaje_resp = 'No existe usuario'
            }
            console.log('Flag imei : ', this.flagImei)
            
          }
        }
      )

      // this.updateCollectionCandado(candado, 'IMEI_3', data1['IMEI_3']);
      // imei_bool =  this.validarImei(data1['IMEI_3']);
      // console.log('Return de función : ', imei_bool)
    }
    if(idEst != ''){
      console.log('Cambio en estación : ', idEst);
      mensaje_resp += this.updateCollectionCandado(candado, 'idEstacion', idEst);
    }

    return 'Se actualizará registros de IMEI solo si existe el usuario creado. Actualice página para verficar registros'
    // if(data1)  
    //this.firestore.doc('candado/' + ID).update(data1);
    //RETURN  RETORNAR CADENA CON LOS CAMPOS QUE SE HAYAN ACTUALIZADO, LIGADO A UN PROMISE LA CONCATENACIÓN DE LA CADENA
  }

}
