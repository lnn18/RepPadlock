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
  templateUrl: './admin-grupo.component.html'
  //styleUrls: ['./admin-grupo.component.css']
})
export class AdminGrupoComponent implements OnInit {

  groupType:string='';
  type:string='';
  settings:string='';
  settingsmsg:string='';
  private routeSub: Subscription;
  data={nombre:'',tipo:'',descripcion:'',activo:true, IMEI:''}
  groupdescription:string='';
  groupname:string='';
  groupId:string='';
  groupdata:any[]=[];
  active:boolean=false;
  activevalue=new FormControl();
  msgenable:boolean;
  itemsselect:any[]=[];
  items:any[]=[];
  id:string;
  enablebtn:boolean;
  
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
    this.enablebtn=false;
    this.msgenable=true;
    this.getGroupsLists();
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
         document.getElementById("selectlabel").style.display='none'; 
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


 private getGroupsLists =()=>this.group.getGroupsList().subscribe(response =>{
  this.itemsselect=[];
  this.items=[];
  for( let order of response)
     this.items.push(order.payload.doc.data());
 
  for (let i=0;i<this.items.length;i++){
      this.itemsselect[i]=this.items[i].nombre;}
      
  
});


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


 messageDialog(title:string ,message:string, create:boolean){
        
  const dialogData = new MessageDialogModel(title,message);
  const dialogRef = this.dialog.open(MessageDialogComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log("button pressed");
      if(create){
        this.group.createGroups(this.data);
        this.delay(700).then(any=>{  
            if(this.type=='usuarios'){
              this.getidGroup();
              this.data.IMEI=this.groupId.slice(5,);
              }  
            this.group.addcomponenttogroupimei(this.groupId,this.data.IMEI);});
        this.groupname=" ";
        this.groupdescription=" ";
        //this.group.addcomponenttogroupimei();
      }
      
    }
  });
 //

 }

  creategroup(newname:string,newdescription:string,namegroup){
    this.msgenable=true;
    if(newname && newdescription){
       // console.log(newname+newdescription);
        if(namegroup==undefined &&this.type=='candados')  {this.messageDialog("Atención","Debe seleccionar un grupo de usuario",false);}
        else{
          this.data.nombre=newname;
          this.data.descripcion=newdescription;
          this.data.tipo=this.type;
          if(this.type=='candados')
            this.data.IMEI=this.getIMEI(namegroup);
          if(this.settingsmsg=="Editar"){
              this.group.updateGroups(this.groupId,this.data);
              this.getLocksbyGroup();
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
          if(this.settingsmsg=="Crear"){
                    this.getidGroup();
                    this.creandogrupo();
          }
        }
      }
    else{
         this.messageDialog("Atención","Debe llenar todos los campos",false);
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(0), ms));
  }

  getidGroup(){
      this.group.getinformationgroup(this.data.nombre,this.type).subscribe(response=>{
        this.groupId="Created";
        for(let order of response){
          this.groupId=order.payload.doc.id;}
      });
  }    

  creandogrupo(){
      this.delay(700).then(any=>{
        if(this.groupId=="Created"){
          this.enablebtn=true;
          const dialogData = new MessageDialogModel("Creando grupo","Grupo creado.");
          this.messageDialog("Creando grupo","Grupo creado.",true);
          this.enablebtn=false;
          this.msgenable=false;
        }
        else{
          if(this.msgenable){
            this.messageDialog("Creando grupo","Grupo ya creado.",false);
          
          }
        }   
      });
  }


  getIMEI(namegroup:string){
    for (let k=0;k<this.items.length;k++){
          if(namegroup==this.items[k].nombre){
            return this.items[k].IMEI;
            break;}
    }
  }

  getLocksbyGroup=()=>this.group.getResultsbyGroups(this.type,this.groupId).subscribe(response =>{
    for(let order of response)
       this.group.updateIMEILocks(order.payload.doc.id,this.data.IMEI);

  });

}
