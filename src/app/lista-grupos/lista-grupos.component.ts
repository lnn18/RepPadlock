import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {GrupoServiceService} from '../grupo-service.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { MdbTablePaginationComponent, MdbTableDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.css']
})
export class ListaGruposComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  groupobject:any []=[];
  
  constructor(
    private db: AngularFirestore,
    private cdRef: ChangeDetectorRef,
    private group: GrupoServiceService
  ) { }

  ngOnInit() {
    this.getGroupAll();
  
  }
  ngAfterViewInit(){
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(20);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getGroupAll =()=>this.group.getGroupAll().subscribe(response =>{
    
    this.groupobject=[];
    for (let order of response){
          this.groupobject.push(order.payload.doc.data());
    }
    // console.log(this.groupobject);

    this.mdbTable.setDataSource(this.groupobject);//nuevo
    this.groupobject= this.mdbTable.getDataSource();
    //this.previous = this.mdbTable.getDataSource();
  });

}
