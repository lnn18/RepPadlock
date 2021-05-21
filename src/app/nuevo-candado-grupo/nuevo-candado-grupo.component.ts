import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {GrupoServiceService} from '../grupo-service.service';
import {CandadoServiceService} from '../candado-service.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MessageDialogModel,MessageDialogComponent} from '../message-dialog/message-dialog.component';



@Component({
  selector: 'app-nuevo-candado-grupo',
  templateUrl: './nuevo-candado-grupo.component.html',
  styleUrls: ['./nuevo-candado-grupo.component.css']
})
export class NuevoCandadoGrupoComponent implements OnInit {

  id:string='';
  routeSub: Subscription;
  groupname:string='';
  items:any[]=[];
  itemsselect:string[];
  locksId:string[];
  itemname:string='';
  itemId:string='';
  candado:any[]=[];
  counter=0;
  grupo:string='';
  groupType:string='';
  type:string='';
  message:string='';
  groupdata:any[]=[];
  
  

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private newgroupcomponents: GrupoServiceService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {   
      this.groupname=params['gruposId'];
      this.groupType=params['id'];
    });
    this.getGroupbyType();
    this.getGroupId();
    this.getElements();
    console.log("Waiting tasks");
    this.delay(20000).then(any=>{

    });
  }


  getGroupbyType(){
    switch(this.groupType) { 
      case 'gruposCandado': { 
         this.type='candados';
         this.message='candado'; 
         break; 
      } 
      case 'gruposUsuarios': { 
         this.type='usuarios';
         this.message='usuario';
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   } 
  }

  private getGroupId =()=>this.newgroupcomponents.getGroupId(this.groupname).subscribe(response =>{
        this.id='';
        this.groupdata=[];
    for( let order of response){
         this.id=order.payload.doc.id;
         this.groupdata.push(order.payload.doc.data()); 
        }

  });

  private getElements =()=>this.newgroupcomponents.getItemsList(this.type).subscribe(response =>{
      this.itemsselect=[];
      this.items=[];
      for( let order of response)
         this.items.push(order.payload.doc.data());
    
      for (let i=0;i<this.items.length;i++){
        if(this.items[i].grupo!=this.id){
          if(this.type=='candados'){
          this.itemsselect[i-this.counter]=this.items[i].nombreCandado;}
          if(this.type=='usuarios'){
            this.itemsselect[i-this.counter]=this.items[i].nombre;}
            
        }
        else{this.counter++;}
      }

  });

 addelementToGroup=()=>this.newgroupcomponents.getIdcomponent(this.type,this.itemname).subscribe(response=>{
       this.itemId='';
       this.candado=[];
    for( let order of response){
        this.itemId=order.payload.doc.id;}

    for( let order of response){
        this.candado.push(order.payload.doc.data());}
        this.grupo=this.candado[0].grupo;
        //this.newgrouplocks.addLockgroup(this.lockId,this.id);
      });



  confirmDialog(message:string){
    const dialogData = new ConfirmDialogModel("Agregando "+this.message, message);
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      
        this.newgroupcomponents.addcomponenttogroup(this.message,this.itemId,this.id,this.type,this.groupdata[0].IMEI);

        const dialogData = new MessageDialogModel("","El "+this.message+" fue agregado al grupo");
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          maxWidth: "400px",
          data: dialogData
        });
     
        dialogRef.afterClosed().subscribe(result => {
          if(result) {
    
          }
        });
      }
    });
  }    


  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(0), ms)).then(()=>console.log("fired"));
  }




lockSelected(additem:string){
  this.itemname=additem;
  this.addelementToGroup();
  this.delay(1000).then(any=>{
    //your task after delay.
    if(this.grupo==" "){ 
      this.confirmDialog('Desea agregar el '+this.message+' '+ additem + ' al grupo?');       
            }
            else{
              if(this.grupo!=this.id){
                this.confirmDialog ('El '+this.message+' '+ additem + ' está asociado a otro grupo, desea añadirlo a este?');
              }
              else{
                this.confirmDialog('Desea agregar el '+this.message+' '+ additem + ' al grupo?');
            }} 
    });
  this.itemname='';
  }
}
