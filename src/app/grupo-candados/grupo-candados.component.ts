import { Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { GrupoServiceService} from '../grupo-service.service';
import { MdbTablePaginationComponent, MdbTableDirective} from 'angular-bootstrap-md';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {AuthServiceService} from '../auth-service.service'
import {inputLog} from '../logRegister.model';
import {UserserviceService} from '../userservice.service'
import {formatDate } from '@angular/common';




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
  private groupType:string='';
  private id:string='';
  private resultdb:any[]=[];
  private groupdata:any[]=[];
  private name:string='';
  private resultname:any[]=[];
  private type:string='';
  private newcomponent:string='';
  private checked:boolean;
  private user:any[]=[];
  private enableall:boolean;
  private message:string='';
  private idResult:any[]=[];
  private permission:boolean=true;
  private activegroup:boolean=true;
  private iswaiting:boolean;
  private logregister:inputLog;
  private email:any[]=[];
  private namelockResult:any[]=[];
  private resultlength:number;
  enableglobal:boolean;
  today= new Date();
  jstoday = '';


  constructor(
    
    private grouplocks: GrupoServiceService,
    private dialog: MatDialog,
    private userService: UserserviceService,
    private authService: AuthServiceService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {   
      this.groupname=params['gruposId'];
      this.groupType=params['id'];
    });
    this.getGroupbyType();
  }



  getGroupbyType(){
    switch(this.groupType) { 
      case 'gruposCandado': { 
         this.type='candados';
         this.newcomponent='nuevocandado';
         this.message='candado'; 
         break; 
      } 
      case 'gruposUsuarios': { 
         this.type='usuarios';
         this.newcomponent='nuevousuario';
         this.message='usuario'; 
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   }
   this.getGroupId();
 }


  private getGroupId =()=>this.grouplocks.getGroupId(this.groupname).subscribe(response =>{
    this.id='';
    for( let order of response)
         this.id=order.payload.doc.id;
    for( let order of response)
         this.groupdata.push(order.payload.doc.data());

    this.activegroup=!this.groupdata[0].activo;     
    this.getResults();
  });



  private getResults=()=>this.grouplocks.getResultsbyGroups(this.type,this.id).subscribe(response =>{
    this.resultdb=[];
    this.resultname=[];
    for (let order of response)
      this.resultdb.push(order.payload.doc.data());

    const rename = (({nombreCandado: nombre, ...rest}) => ({nombre, ...rest}))
        
    for(let i=0;i<this.resultdb.length;i++){   
      if(this.type=='candados'){
        //Object.assign(this.resultname.nombre,this.resultdb[i].nombreCandado);
        this.resultname.push(rename(this.resultdb[i]));
       // console.log(this.resultname[i]);
      }
      if(this.type=='usuarios'){
        this.resultname.push(this.resultdb[i]);
      }
    }

    this.mdbTable.setDataSource(this.resultname);//nuevo
    this.resultname= this.mdbTable.getDataSource();

   /*
    if(this.type=='usuarios'){
      for(let i=0;i<this.resultname.length;i++){
           this.getidbyImei(this.resultname[i]);
           this.delay(500).then(any=>{
           for(let k=0;k<this.namelockResult.length;k++){
              if(this.namelockResult[k].permiso){
                this.resultname[i].permiso=true;
               break;
              }
              else{this.resultname[i].permiso=false;
                }

           }});
           console.log(this.resultname[i]);
            
      } 
    }
   */
    for(let i=0;i<this.resultname.length;i++){
      if(!this.resultname[i].permiso){
        this.enableglobal=false;
        break;
      }
      else{
        this.enableglobal=true;
      }
    }
  
  
  });



  private getResultsbyName_2=()=>this.grouplocks.getIdcomponent(this.type, this.name).subscribe(response=>{
    this.id='';
    for( let order of response){
        this.id=order.payload.doc.id;
    }
    //console.log(this.id);
    this.grouplocks.updateResultgroup(this.type,this.id);
       
  });


  onclick(lockname):void{
    const message = 'Desea eliminar este '+this.message+"?";
    const dialogData = new ConfirmDialogModel("Eliminando "+this.message, message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.name=lockname.nombre;
        this.getResultsbyName_2();     
      }
    });
  }

  

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(0), ms)).then(()=>this.iswaiting=true);
  }


 // cuando se realiza un cambio en todo el grupo 
  getstatus(isChecked){
    this.enableall=isChecked.checked;
    if(this.type=="candados"){
    this.grouplocks.getResultsbyGroups(this.type,this.id).subscribe(response=>{
      this.idResult=[];
      this.namelockResult=[];
      for( let order of response){
            this.idResult.push(order.payload.doc.id);
            this.namelockResult.push(order.payload.doc.data());
          }
            
       });
      }
/*
      if(this.type=="usuarios"){
        for(let i=0;i<this.resultname.length;i++){
          this.getidbyImei(this.resultname[i]);
        }
      }
*/
      this.updatePermission(this.enableall);
    
  }
 // Cuando se realiza un permiso individual
  changeStatus(isChecked,object){
    if(this.type=='candados'){
          this.grouplocks.getIdcomponent(this.type,object.nombre).subscribe(response=>{
            this.idResult=[];
            this.namelockResult=[];
            for( let order of response){
                  this.idResult.push(order.payload.doc.id);
                  this.namelockResult.push(order.payload.doc.data());}
                  //console.log("----->"+this.idResult);          
          });
        
    }

    /*
    if(this.type=='usuarios'){
      this.getidbyImei(object);}*/
    this.updatePermission(isChecked.checked);
  }
/*
getidbyImei(object){
     this.idResult=[];
     this.namelockResult=[];
     this.resultlength=0;
   
      this.grouplocks.getlockbyIMEI_1(object.IMEI).subscribe(response=>{
        for( let order of response){
              this.idResult.push(order.payload.doc.id);
              this.namelockResult.push(order.payload.doc.data());}
              
      });
      this.grouplocks.getlockbyIMEI_2(object.IMEI).subscribe(response=>{
        for( let order of response){
              this.idResult.push(order.payload.doc.id);
              this.namelockResult.push(order.payload.doc.data());}
      });
      this.grouplocks.getlockbyIMEI_3(object.IMEI).subscribe(response=>{
        for( let order of response){
          
              this.idResult.push(order.payload.doc.id);
              this.namelockResult.push(order.payload.doc.data());}
      });

     
        console.log(this.idResult.length);
        console.log(this.idResult);
}

 */   

    updatePermission(enable:boolean){
      this.userService.getCurrentUser().then(val=> this.email.push(val.email));
     
      
      this.delay(500).then(any=>{
        for(let k=0;k<this.idResult.length;k++){
          this.grouplocks.updatepermission(this.idResult[k],enable);
          this.today= new Date();
          this.jstoday = formatDate(this.today, 'dd/MM/yyyy hh:mm:ss a', 'en-US', '-0500');
          this.logregister = { 
            candado: this.namelockResult[k].nombreCandado,
            email: this.email[0],
            permiso: enable,
            date: this.jstoday

          }
          //console.log(this.logregister);  
          //this.grouplocks.newLogRecord(this.logregister);
          }
         });      
    }

    

}
