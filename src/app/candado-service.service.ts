import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CandadoServiceService {

  constructor(private firestore: AngularFirestore) { }

  getInformacionRegistro(){//Se obtiene información de la tabla registro 
    return this.firestore.collection("Registro", ref => ref)
    //.orderBy(this.fechaHora,'desc')
    .snapshotChanges()
  }

  public getOneRegister(documentId: string) {
    return this.firestore.collection('Registro').doc(documentId).snapshotChanges();
  }

  //Trae la información de la colección registro ordenando por la ciudad
   getInformacionCiudad(){
    return this.firestore.collection("usuario", ref => ref .orderBy('ciudad',"desc"))
    //.limit(10).orderBy('ciudad',"desc"))
    .snapshotChanges()
  } 

  getInformacionUsuario(){ //Se obtiene información de la tabla registro 
    return this.firestore.collection("usuario", ref => ref)

    .snapshotChanges()
  }

  public getOneCiudad() {
    return this.firestore.collection("ciudad").snapshotChanges();
  }

  getInformacionCandado(){ //Se obtiene información de la tabla registro 
    return this.firestore.collection("candado", ref => ref).snapshotChanges();
  }

}
  //return this.firestore.collection("ciudad").doc(Id).snapshotChanges()

  /*public getOneCiudad1(Id: string ) {
    let city  = this.firestore.collection("ciudad").doc(Id).snapshotChanges()
  
    return city

  }*/

   /*getInformacionCiudad(){ 
    return this.firestore.collection("ciudad", ref => ref)
  
    //.orderBy(this.fechaHora,'desc')
    .snapshotChanges()
  }*/