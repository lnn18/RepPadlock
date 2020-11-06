import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GrupoServiceService {

  constructor(
      private db: AngularFirestore
  ) { }

  getGroupAll(){
      return this.db.collection('grupos').snapshotChanges();
  }

  getGroupId(name:string){
      return this.db.collection('grupos',ref => ref .where ('nombre','==',name)).snapshotChanges();

  }

  getLockbyGroups(grupo:any){
    return this.db.collection("candado", ref => ref .where('grupo', "==", grupo)).snapshotChanges();
  }

  getLockbyName(name:any){
    return this.db.collection("candado", ref => ref .where('nombreCandado', "==", name)).snapshotChanges();
  }
  
  updateLockgroup(id:string){
    this.db.collection("candado").doc(id).update({grupo: '' });
    return false ;
  }
  
  addLockgroup(id:string,group:string){
    this.db.collection("candado").doc(id).update({grupo: group });
    return false;
  }
  
  getIdLock(name:any){
    return this.db.collection("candado", ref => ref .where('nombreCandado', "==", name)).snapshotChanges();
  }
}
