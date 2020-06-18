import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Input  } from '@angular/core';
import { CandadoServiceService } from '../candado-service.service';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
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
  idEst : string = "";
  nombreEst : any = []

  constructor(
    public candado: CandadoServiceService,
    private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) { }

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
      this.info.push(ord.payload.doc.data());
    }

    for(let i = 0; i < this.info.length; i++){
      this.idEst = this.info[i].idEstacion;
    }
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
    this.seleccion = this.estacion;
  }

  getEstacion = () => this.candado
  .getOneEstacion(this.idEst)
  .subscribe(resp => {
    this.nombreEst = [];

      this.nombreEst = resp.payload.data();

  });

}
