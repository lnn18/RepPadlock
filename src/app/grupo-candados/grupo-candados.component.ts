import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {GrupoServiceService} from '../grupo-service.service';
import { MdbTablePaginationComponent, MdbTableDirective} from 'angular-bootstrap-md';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-grupo-candados',
  templateUrl: './grupo-candados.component.html',
  styleUrls: ['./grupo-candados.component.css']
})
export class GrupoCandadosComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
 
  private routeSub: Subscription;
  private groupname:string='';
  private gruoplock:any[]=[];
  private id:string='';
  private locks:any[]=[];
  private result: string = '';
  private lockbyname:any[]=[];
  private name:string='';


  constructor(
    
    private grouplocks: GrupoServiceService,
    private dialog: MatDialog,
    private router: Router,
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

  private getGroupId =()=>this.grouplocks.getGroupId(this.groupname).subscribe(response =>{
    this.id='';
    for( let order of response)
         this.id=order.payload.doc.id;
    this.getLock();
    console.log("getGruopId");
  });

  private getLock=()=>this.grouplocks.getLockbyGroups(this.id).subscribe(response =>{
    this.locks=[];
    for (let order of response)
      this.locks.push(order.payload.doc.data());
     
    this.mdbTable.setDataSource(this.locks);//nuevo
    this.locks= this.mdbTable.getDataSource(); 

    console.log(this.locks);
    console.log("getLock");
  });

  private getLockbyName=()=>this.grouplocks.getLockbyName(this.name).subscribe(response=>{
    this.id='';
    for( let order of response)
        this.id=order.payload.doc.id;
        console.log('----->'+this.id);
        this.grouplocks.updateLockgroup(this.id);
        console.log("getLockbyName");
  });


  onclick(lockname:string):void{

    const message = 'Desea eliminar este candado?';
    const dialogData = new ConfirmDialogModel("Eliminando candado", message);
    console.log("button pressed");
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.name=lockname;
        this.getLockbyName();     
      }
    });


  }

// private gotoaddnewlock(name:string){
//     this.router.navigate(["/grupos/nuevocandado",name]);
//   }

}
