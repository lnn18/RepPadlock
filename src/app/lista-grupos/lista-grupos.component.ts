import { Component, OnInit, ViewChild,  AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {GrupoServiceService} from '../grupo-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective} from 'angular-bootstrap-md';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.css']
})
export class ListaGruposComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  private routeSub: Subscription;
  groupobject:any []=[];
  locks:any []=[];
  id:any={'id':''};
  selectobject: string [];
  selectid:string='';
  groupType:string='';
  type:string='';
  groupid:string='';
  msgenable:boolean;
  buttonenable:boolean; 
  searchText: string = '';

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private group: GrupoServiceService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {   
      this.groupType=params['id'];
    });
    this.getGroupbyType();
    this.buttonenable=false;
  
  }
  ngAfterViewInit(){
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(20);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }


  getGroupbyType(){


    switch(this.groupType) { 
      case 'gruposCandado': { 
         this.type='candados'; 
         break; 
      } 
      case 'gruposUsuarios': { 
         this.type='usuarios';
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   }
   this.getGroupAll(); 
  }



  getGroupAll =()=>this.group.getGroupAllbyType(this.type).subscribe(response =>{
    
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


  messageDialog(groupname:string, groupid:string){
        
    const dialogData = new ConfirmDialogModel("Eliminando grupo","¿Seguro desea eliminar el grupo "+groupname+"?");
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.group.deleteGroups(groupid);
        this.msgenable=false;

      }
    
    });
    
    }

  onclick(groupname:string){
      let groupid;
      this.msgenable=true;
      this.group.getGroupId(groupname).subscribe(response =>{
        for (let order of response)
           groupid=order.payload.doc.id;
         //  console.log(this.groupid);
         if(this.msgenable)
          this.messageDialog(groupname,groupid);  
      });


  }

  searchItems(algo) {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(prev);
      this.groupobject = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.groupobject= this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

}
