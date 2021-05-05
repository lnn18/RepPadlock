import { Component, OnInit, ViewChild,  AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {GrupoServiceService} from '../grupo-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective} from 'angular-bootstrap-md';

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

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private group: GrupoServiceService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {   
      this.groupType=params['id'];
    });
    this.getGroupbyType();
  
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

  onclick(groupname:string){

      this.group.getGroupId(groupname).subscribe(response =>{
        for (let order of response)
           this.groupid=order.payload.doc.id;
           console.log(this.groupid);         

          this.group.deleteGroups(this.groupid);
      });


  }

}
