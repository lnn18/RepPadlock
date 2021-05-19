import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GrupoServiceService {

  constructor(
      private db: AngularFirestore
  ) { }

  getGroupAllbyType(type:string){
      return this.db.collection('grupos',ref => ref .where ('tipo','==',type)).snapshotChanges();
  }

  getGroupId(name:string){
      return this.db.collection('grupos',ref => ref .where ('nombre','==',name)).snapshotChanges();
  }
////

  getResultsbyGroups(type:string,grupo:any){
    if(type=='candados')
      return this.db.collection("candado", ref => ref .where('grupo', "==", grupo)).snapshotChanges();
    if(type=='usuarios')
      return this.db.collection("usuario", ref => ref .where('grupo', "==", grupo)).snapshotChanges();  
  }
 
  updateResultgroup(type:string,id:string){
    if(type=='candados')
      this.db.collection("candado").doc(id).update({grupo: " " });
    if(type=='usuarios')
      this.db.collection("usuario").doc(id).update({grupo: " " });
  }


  getResultsbyName(type:string,name:any){
    if(type=='candados')
    return this.db.collection("candado", ref => ref .where('nombreCandado', "==", name)).snapshotChanges();
    if(type=='usuarios')
    return this.db.collection("usuario", ref => ref .where('nombre', "==", name)).snapshotChanges();
  
  }
///  
  addcomponenttogroup(collection:string,id:string,group:string,type:string,IMEI:string){
    if(type=="usuarios")
        this.db.collection(collection).doc(id).update({grupo: group,IMEI:group.slice(5,)});
    if(type=="candados")
        this.db.collection(collection).doc(id).update({grupo: group,IMEI_1:IMEI});
   }

  addcomponenttogroupimei(id:string,imei:string){
        this.db.collection("grupos").doc(id).update({IMEI: imei});    
   }

   updateIMEILocks(id:string,imei:string){
    this.db.collection("candado").doc(id).update({IMEI_1: imei });
   }
   
  
  getIdcomponent(type:string,name:string){
    if(type=='candados')
      return this.db.collection("candado", ref => ref .where('nombreCandado', "==", name)).snapshotChanges();
    if(type=='usuarios')
      return this.db.collection("usuario", ref => ref .where('nombre', "==", name)).snapshotChanges();
   
  }

  getIdcomponentbyGroup(type:string,name:string){
    if(type=='candados')
      return this.db.collection("candado", ref => ref .where('nombreCandado', "==", name)).snapshotChanges();
    if(type=='usuarios')
      return this.db.collection("usuario", ref => ref .where('nombre', "==", name)).snapshotChanges();
   
  }

  updateGroups(id:string,data:any){
    this.db.collection("grupos").doc(id).update(data);
  }

  createGroups(data){
      return new Promise<any>((resolve, reject) =>{
      this.db
          .collection("grupos")
          .add(data)
          .then(res => {}, err => reject(err));
    });   
  }

  deleteGroups(id:string){
    this.db.collection("grupos").doc(id).delete();
  }

getItemsList(type:string){
  if(type=='candados')
    return this.db.collection("candado", ref => ref .orderBy('nombreCandado', "asc")).snapshotChanges();
  if(type=='usuarios')
    return this.db.collection("usuario", ref => ref .orderBy('nombre', "asc")).snapshotChanges();
  
}

getGroupsList(){
  return this.db.collection("grupos", ref => ref .where('tipo','==','usuarios')).snapshotChanges();
}

updatepermission(id:string, permission:boolean){
  this.db.collection("candado").doc(id).update({permiso: permission });
  }

getlockbyIMEI_1(imei:string){
 return this.db.collection("candado", ref => ref .where('IMEI_1','==',imei)).snapshotChanges();
}

getlockbyIMEI_2(imei:string){
  return this.db.collection("candado", ref => ref .where('IMEI_2','==',imei)).snapshotChanges();
 }

 getlockbyIMEI_3(imei:string){
  return this.db.collection("candado", ref => ref .where('IMEI_3','==',imei)).snapshotChanges();
 }


 getinformationgroup(namegroup:string,type:string){
  return this.db.collection("grupos", ref => ref .where('nombre', "==", namegroup).where('tipo',"==",type)).snapshotChanges();
 }

 newLogRecord(inputLog:object){
  this.db.collection("LogEvent").add(inputLog);
 }
 
}
