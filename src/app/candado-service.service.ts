import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


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
  /* getInformacionCiudad(){
    return this.firestore.collection("Registro", ref => ref
    .limit(10).orderBy('ciudad',"desc"))
    .snapshotChanges()
  } */
  }

