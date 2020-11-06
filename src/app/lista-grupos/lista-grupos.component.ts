import { Component, OnInit, ViewChild,  AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {GrupoServiceService} from '../grupo-service.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { MdbTablePaginationComponent, MdbTableDirective} from 'angular-bootstrap-md';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.css']
})
export class ListaGruposComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  groupobject:any []=[];
  locks:any []=[];
  id:any={'id':''};
  selectobject: string [];

  selectid:string='';
  
  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
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
    this.selectobject=[];
    this.id=[];

    for (let order of response)         
          this.groupobject.push(order.payload.doc.data());          

    for (let i=0;i<this.groupobject.length;i++){
        this.selectobject[i]=this.groupobject[i].nombre;
        }  
    this.mdbTable.setDataSource(this.groupobject);//nuevo
    this.groupobject= this.mdbTable.getDataSource();
    //this.previous = this.mdbTable.getDataSource();
  });


  gotoeditgroup(route:string){
    this.router.navigate(["/grupos",route]);
  }

}
