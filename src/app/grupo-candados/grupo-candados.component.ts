import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {GrupoServiceService} from '../grupo-service.service';
import { MdbTablePaginationComponent, MdbTableDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-grupo-candados',
  templateUrl: './grupo-candados.component.html',
  styleUrls: ['./grupo-candados.component.css']
})
export class GrupoCandadosComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
 
  routeSub: Subscription;
  groupname:string='';
  gruoplock:any[]=[];
  id:string='';
  locks:any[]=[];

  constructor( 
    private grouplocks: GrupoServiceService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {   
      this.groupname=params['gruposId'];
    });

    this.getGroupId();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getGroupId =()=>this.grouplocks.getGroupId(this.groupname).subscribe(response =>{
    for( let order of response)
         this.id=order.payload.doc.id;
    this.getLock();
  });

  getLock=()=>this.grouplocks.getLockbyGroups(this.id).subscribe(response =>{
    this.locks=[];
    for (let order of response)
      this.locks.push(order.payload.doc.data());
     
    this.mdbTable.setDataSource(this.locks);//nuevo
    this.locks= this.mdbTable.getDataSource(); 

    console.log(this.locks);
  });


  

}
