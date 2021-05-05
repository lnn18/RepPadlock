import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service'
import { Subscription } from 'rxjs';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { GrupoServiceService} from '../grupo-service.service';
import { MessageDialogComponent,MessageDialogModel} from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { data } from 'jquery';

@Component({
  selector: 'app-admin-grupo',
  templateUrl: './admin-grupo.component.html',
  styleUrls: ['./admin-grupo.component.css']
})
export class AdminGrupoComponent implements OnInit {

  groupType:string='';
  type:string='';
  settings:string='';
  settingsmsg:string='';
  private routeSub: Subscription;
  data={nombre:'',tipo:'',descripcion:'',activo:true}
  groupdescription:string='';
  groupname:string='';
  groupId:string='';
  groupdata:any[]=[];
  active:boolean=false;
  activevalue=new FormControl();
  
  
  
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private group: GrupoServiceService
  ) { }

  ngOnInit() {
  

    this.routeSub = this.route.params.subscribe(params => {   
      this.groupType=params['id'];
      this.settings=params['settings'];
    });
    this.getGroupbyType();

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

   switch(this.settings) {
    case 'agregandogrupo':{
        this.settingsmsg='Crear';
      break;
    }
    default:{
      this.settingsmsg='Editar';
      this.getDatabygroup();
      break;
      }
    }
 }

 getDatabygroup=()=>this.group.getGroupId(this.settings).subscribe(response =>{
   this.groupId='';
   this.groupdata=[];
   for(let order of response)
       this.groupId=order.payload.doc.id;
   for (let order of response)
        this.groupdata.push(order.payload.doc.data());
    this.groupdescription=this.groupdata[0].descripcion;
    this.groupname=this.groupdata[0].nombre;
    this.active=this.groupdata[0].activo;

 });

 onChange(){
  // console.log(this.activevalue.value);
   this.data.activo=this.activevalue.value;
 }


 messageDialog(title,message){
        
  const dialogData = new MessageDialogModel(title,message);
  const dialogRef = this.dialog.open(MessageDialogComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log("button pressed");
      this.groupname=" ";
      this.groupdescription=" ";
    }
  });
 

 }

  creategroup(newname:string,newdescription:string){
   
    if(newname && newdescription){
        console.log(newname+newdescription);
        this.data.nombre=newname;
        this.data.descripcion=newdescription;
        this.data.tipo=this.type;
        if(this.settingsmsg=="Editar"){
          this.group.updateGroups(this.groupId,this.data);
          const dialogData = new MessageDialogModel("Editando grupo","Grupo editado.");
         
          const dialogRef = this.dialog.open(MessageDialogComponent, {
            maxWidth: "400px",
            data: dialogData
          });
       
          dialogRef.afterClosed().subscribe(result => {
            if(result) {
              console.log("button pressed");
            }});
        }
        else{
          console.log(this.type); 
          this.group.getinformationgroup(this.data.nombre,this.type).subscribe(reponse=>{
            this.groupId='';
              for(let order of reponse)
                this.groupId=order.payload.doc.id;


              if(this.groupId==''){
                this.group.createGroups(this.data);
                const dialogData = new MessageDialogModel("Creando grupo","Grupo creado.");
                this.messageDialog("Creando grupo","Grupo creado.");
              }
              else{
                this.messageDialog("Creando grupo","Grupo ya creado.");
              }   
          });
           
          }

      }

      else{
         this.messageDialog("Atención","Los campos no pueden quedar vacios");
      }

  }




}
