import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {GrupoServiceService} from '../grupo-service.service';
import {CandadoServiceService} from '../candado-service.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-nuevo-candado-grupo',
  templateUrl: './nuevo-candado-grupo.component.html',
  styleUrls: ['./nuevo-candado-grupo.component.css']
})
export class NuevoCandadoGrupoComponent implements OnInit {

  id:string='';
  routeSub: Subscription;
  groupname:string='';
  locks:any[]=[];
  locksselect:string[];
  locksId:string[];
  lockname:string='';
  lockId:string='';
  candado:any[]=[];
  counter=0;
  grupo:string='';
 
  

  constructor(
    
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private locksservice: CandadoServiceService,
    private newgrouplocks: GrupoServiceService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {   
      this.groupname=params['gruposId'];
    });

    this.getGroupId();
    this.getLocks();
  }

  private getGroupId =()=>this.newgrouplocks.getGroupId(this.groupname).subscribe(response =>{
        this.id='';
    for( let order of response)
         this.id=order.payload.doc.id;
    
  });

  private getLocks =()=>this.locksservice.getInfoCandado().subscribe(response =>{
      this.locksselect=[];
      this.locks=[];
      for( let order of response)
         this.locks.push(order.payload.doc.data());
    
      for (let i=0;i<this.locks.length;i++){
        if(this.locks[i].grupo!=this.id){
          this.locksselect[i-this.counter]=this.locks[i].nombreCandado;
        }
        else{this.counter++;}
      }

  });

 addLockToGroup=()=>this.newgrouplocks.getIdLock(this.lockname).subscribe(response=>{
       this.lockId='';
       this.candado=[];
    for( let order of response){
        this.lockId=order.payload.doc.id;}

    for( let order of response){
        this.candado.push(order.payload.doc.data());}
        this.grupo=this.candado[0].grupo;
      
    
        //this.newgrouplocks.addLockgroup(this.lockId,this.id);
      });



  confirmDialog(message:string){
    const dialogData = new ConfirmDialogModel("Agregando candado", message);
    console.log("button pressed");
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      
        this.newgrouplocks.addLockgroup(this.lockId,this.id);
      }
    });
  }    


  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}




  lockSelected(lockname:string){
    this.lockname=lockname;
    this.addLockToGroup();
    this.delay(1000).then(any=>{
      //your task after delay.
      if(this.grupo==""){ 
        this.confirmDialog('Desea agregar el candado '+ lockname + ' al grupo?');       
              }
              else{
                if(this.grupo!=this.id){
                  this.confirmDialog ('El candado '+ lockname + ' está asociado a otro grupo, desea añadirlo a este?');
                  
                }
                else{
                  this.confirmDialog('Desea agregar el candado '+ lockname + ' al grupo?');
             
              }}   
     
     });
    
   
    
    console.log(lockname);
    this.lockname='';
   
 
    
  }

}
