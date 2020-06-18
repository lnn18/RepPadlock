import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CandadoServiceService } from '../candado-service.service';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-candados-info',
  templateUrl: './tabla-candados-info.component.html',
  styleUrls: ['./tabla-candados-info.component.css']
})
export class TablaCandadosInfoComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  //fechaHora='';
  newDate: Date;
  //Data object for listing items
  Candados: any[] = []; 
  //Save first document in snapshot of items received
  previous: any = [];
  searchText: string = '';
  previous2: string;
  searchDate:Date;
  nombreVec: any = [];
  nombreCand: string= '';


  constructor(
    public candadoi: CandadoServiceService,
    private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getInformacionCandado(); 
    this.previous2 = this.mdbTable.getDataSource(); 
  }

  ngAfterViewInit() {//Se agrega función para realizar ejemplo de la tabla
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(20);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getInformacionCandado = () => this.candadoi
  .getInfoCandado()
  .subscribe(response =>{ 
      this.Candados= [];
      for (let order of response) {
        this.Candados.push(order.payload.doc.data());
        this.cambiarNombre();
      }
      
      this.mdbTable.setDataSource(this.Candados);//nuevo
      this.Candados = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();

    
  }, error => {
  });

  searchItems(algo) {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(prev);
      this.Candados = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.Candados = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  cambiarNombre(){
    for(let i = 0; i < this.Candados.length; i++){
      this.nombreVec[i] = this.Candados[i].nombreCandado;
      this.nombreCand = this.nombreVec[i];
      this.candadoi.enviarNombre(this.nombreCand);
    }
  }

  verAdmin(nombre: string){
    this.router.navigate(["/admin", nombre]);
  }

}


/*
for(let i = 0; i < this.Candados.length; i++){
          this.nombreCand = this.Candados[i].nombreCandado;
          this.cambiarNombre();
          this.cambioTexto(this.nombreCand);
        }
        
        cambioTexto(nombreCand: string){
      this.candadoi.enviarNombre(nombreCand);
  }*/