import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Input  } from '@angular/core';
import { CandadoServiceService } from '../candado-service.service';
import { AuthServiceService } from '../auth-service.service'
//import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
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
  imeis: any[] = [];
  Ciudades: any[] = [];
  idCiudades: any[] = [];
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
    //private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit() {
    this.authService.enviarNombreObservable.subscribe(response =>{
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
    //ingresar validación de IMEI
    //1. tomar cada uno de los campos de imei
    //2. realizar una búsqueda en la tabla de usuarios del imei ingresado
    //3. Si uno de los imeis ingresados no están en la tabla usuario madar error de actualización no cambir datos
    // console.log('redifinicion ok data : ', data1);

  //       this.candado.getCiudades().subscribe(response =>{ 
  //     this.Ciudades = [];
  //     this.idCiudades = [];
      
  //     for (let order of response) {
  //       this.idCiudades.push(order.payload.doc.id)
  //       this.Ciudades.push(order.payload.doc.data()['nombreCiudad']);
  //     }
  //     console.log('las ciudades :', this.Ciudades, this.idCiudades);
    
  // }, error => {
  // });
    // this.candado.imeiValidate(data1['IMEI_3']).then(

    // )
    this.candado.imeiValidate(data1['IMEI_3'])
    .then(response => {
          this.imeis = [];
          let responses = [response]
          for (let order of responses) {
            //this.imeis.push(order.payload.doc.id)
            this.imeis.push([order]);
            // this.imeis.push(order.payload.doc.data()['nombre']);
          }
          console.log('Imeis en Admin - promise candado : ', this.imeis)
    
        }, err => {
          // console.log(err);
          this.mensaje = err.message;
          //this.successMessage = "";
         }
    )
    
    // .subscribe(response => {
    //   this.imeis = [];
    //   for (let order of response) {
    //     //this.imeis.push(order.payload.doc.id)
    //     this.imeis.push(order.payload.doc.data()['nombre']);
    //   }
    //   console.log('Imeis en Admin candado : ', this.imeis)

    // })
    
    this.mensaje = this.authService.updateCandado(data1, this.idEst1, this.idPadlock)
    console.log('Mensaje obtenido en funcion principal : ', this.mensaje)
    

  }
  // {

  //   let data1 = this.authService.form1.value;
  //   console.log('Información de candado : ', data1)
  //   //this.authService.updateCandado(this.idEst, data1);

  // }

}
