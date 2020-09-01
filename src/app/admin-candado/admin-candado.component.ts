import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Input  } from '@angular/core';
import { CandadoServiceService } from '../candado-service.service';
import { AuthServiceService } from '../auth-service.service'
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin-candado',
  templateUrl: './admin-candado.component.html',
  styleUrls: ['./admin-candado.component.css']
})
export class AdminCandadoComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  Estaciones: any[] = []; 
  seleccion: string = "";
  estacion: string = "";
  nombreCand: string= '';
  index1: string= '';
  admin: number;
  info : any = [];
  info1 : any = [];
  idEst : string = "";
  idEst1 : string = "";
  nombreEst : any = []
  idEstaciones: any[] = [];
  idCandado: any[] = [];
  idPadlock : string;
  mensaje: string;

  constructor(
    public candado: CandadoServiceService,
    public authService: AuthServiceService,
    private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit() {
    this.candado.enviarNombreObservable.subscribe(response =>{
      this.nombreCand = response;
    })

    this.rutaActiva.paramMap.subscribe(params =>{
      if (params.has("nombre")){
        this.candado.obtenerNombreAdmin(params.get("nombre"));
        this.nombreCand = params.get("nombre");
      }
    })

    this.getInformacionCandado();
    
    this.getInformacionEstacion();
    
     
  }

  getInformacionCandado = () => this.candado
      .getOneCandado(this.nombreCand)
        
      .subscribe(resp => {
    this.info = [];

    for (let ord of resp){
      this.idCandado.push(ord.payload.doc.id)
      this.info.push(ord.payload.doc.data());
    }

    for(let i = 0; i < this.info.length; i++){
      this.idEst = this.info[i].idEstacion;
    }
    this.idPadlock = this.idCandado[0];
    this.getEstacion();
      
  });

  getInformacionEstacion = () => this.candado
  .getEstacion()
  .subscribe(response =>{ 
      this.Estaciones = [];
      
      for (let order of response) {
        this.Estaciones.push(order.payload.doc.data());
      }
    
  }, error => {
  });

  capturar(){
    console.log('Estación capturada : ', this.estacion)
    this.seleccion = this.estacion;
    this.getId1();
  }

  getId1 = () => this.candado
  .getId(this.seleccion)
  .subscribe(resp => {
    this.info1 = [];
    this.idEstaciones = [];

    for (let ord1 of resp){
      this.idEstaciones.push(ord1.payload.doc.id)
      this.info1.push(ord1.payload.doc.data());
    }
    this.idEst1 = this.idEstaciones[0];
    console.log('ID estación capturado : ',this.idEst1)

  });

  getEstacion = () => this.candado
  .getOneEstacion(this.idEst)
  .subscribe(resp => {
    this.nombreEst = [];

      this.nombreEst = resp.payload.data();

  });

  // candadoUpd = () => this.authService.updateCandado();
  
  candadoUpd(){
    let data1 = this.authService.form1.value;
    
    // console.log('redifinicion ok data : ', data1);
    this.mensaje = this.authService.updateCandado(data1, this.idEst1, this.idPadlock)
    console.log('Mensaje obtenido en funcion principal : ', this.mensaje)

  }
  // {

  //   let data1 = this.authService.form1.value;
  //   console.log('Información de candado : ', data1)
  //   //this.authService.updateCandado(this.idEst, data1);

  // }

}
