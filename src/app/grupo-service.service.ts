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



}
