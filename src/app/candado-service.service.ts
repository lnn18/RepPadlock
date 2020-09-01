import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class CandadoServiceService {

  nombreCand : string = '';
  private enviarNombreSubject = new Subject<string>();
  enviarNombreObservable = this.enviarNombreSubject.asObservable();

  baseURLAdmin = environment.apiURL + 'admin/';

  constructor(private firestore: AngularFirestore, 
              private http: HttpClient) { }

  getInformacionRegistro(){//Se obtiene información de la tabla registro 
    // return this.firestore.collection("Registro", ref => ref)
    // //.orderBy(this.fechaHora,'desc')
    // .snapshotChanges()

    return this.firestore.collection("Registro", ref => ref)
    //.orderBy(this.fechaHora,'desc')
    .snapshotChanges()

    // return this.firestore.collection("Registro", ref => ref.orderBy("estado","desc").limit(20))
    // //.orderBy(this.fechaHora,'desc')
    // .snapshotChanges()
  }

   getInformacionRegistroDate(startDate: Date, endDate: Date){//Se obtiene información de la tabla registro 
    console.log('fecha de filtrado inicio : ',startDate)
    console.log('fecha de filtrado final : ',endDate)
    return this.firestore.collection("Registro", ref => ref.where("toDate(fechaHora)", ">", startDate)
    ).snapshotChanges();
    //.orderBy(this.fechaHora,'desc')
    
  }

  // getInformacionRegistroDateArray(startDate: Date, endDate: Date){//Se obtiene información de la tabla registro 
  //   console.log('fecha de filtrado inicio : ',startDate)
  //   console.log('fecha de filtrado final : ',endDate)
  //   let Candados: any[] = []; 
  //   this.firestore.collection("Registro", ref => ref.where('fechaHora', '>', startDate)).get().subscribe(data => {
  //     console.log('revision de datos filtrados - ')
  //     data.forEach(function(doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log('Salida query ',doc.id, " => ", doc.data());
  //   });
  //   })

    getInformacionRegistroDateArray(startDate: Date, endDate: Date){//Se obtiene información de la tabla registro 
      console.log('fecha de filtrado inicio : ',startDate)
      console.log('fecha de filtrado final : ',endDate)
      let Candados: any; 
      Candados = this.firestore.collection("Registro", ref => ref.where('fechaHora', '>', startDate)).snapshotChanges()

      console.log('Registro en array : ',Candados)
      
          //this.firestore.collection('Registro', ref => ref.where('fechaHora', '>', startDate);
        
    return Candados
    
    // db.collection("cities").where("capital", "==", true)
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
   
    //.orderBy(this.fechaHora,'desc')
    
  }
  // .where('fechaHora', '<=', endDate)
  // getInformacionRegistroDate(startDate: Date, endDate: Date){//Se obtiene información de la tabla registro 
  //   return this.firestore.collection("Registro", ref => ref.where('dueDate', '>', startDate)
  //   .where('dueDate', '<', endDate))
  //   .snapshotChanges
  //   //.orderBy(this.fechaHora,'desc')
    
  // }

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

  public getOneCiudad(Id: string) {
    return this.firestore.collection("ciudad", ref => ref .where('ID', "==", Id)).snapshotChanges();
  }

  public getIdByCiudad(ciudad: string) {
    return this.firestore.collection("ciudad", ref => ref .where('nombreCiudad', "==", ciudad)).snapshotChanges();
  }

  getInfoCandado(){ //Se obtiene información de la tabla registro 
    return this.firestore.collection("candado", ref => ref .orderBy('nombreCandado', "asc")).snapshotChanges();
  }

  getEstacion(){ //Se obtiene información de la tabla registro 
    return this.firestore.collection("estacion", ref => ref).snapshotChanges();
  }

  getCiudades(){ //Se obtiene información de la tabla registro 
    return this.firestore.collection("ciudad", ref => ref).snapshotChanges();
  }

  enviarNombre(nombreCand: string){
    this.nombreCand = nombreCand;
    this.enviarNombreSubject.next(nombreCand);
  }

  obtenerNombreAdmin(nombre: string){
    const url = `${this.baseURLAdmin}?userNombre=${nombre}`;
    return url;
  }

  public getOneCandado(nombre: string) {
    return this.firestore.collection("candado", ref => ref .where('nombreCandado', "==", nombre)).snapshotChanges();
  }

  public getId(nombre: string) {
    return this.firestore.collection("estacion", ref => ref .where('nombreEstacion', "==", nombre)).snapshotChanges();
  }

  public getOneEstacion(Id: string ) {
    return this.firestore.collection("estacion").doc(Id).snapshotChanges();
  }
}
  //return this.firestore.collection("ciudad").doc(Id).snapshotChanges()

  /*public getOneCiudad1(Id: string ) {
    let city  = this.firestore.collection("ciudad").doc(Id).snapshotChanges()
  
    return city

    return this.firestore.collection("candado", ref => ref .where('nombreCandado', "==", nombre)).snapshotChanges();

  }*/

   /*getInformacionCiudad(){ 
    return this.firestore.collection("ciudad", ref => ref)
  
    //.orderBy(this.fechaHora,'desc')
    .snapshotChanges()
  }*/