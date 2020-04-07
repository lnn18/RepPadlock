import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CandadoServiceService } from '../candado-service.service';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  //fechaHora='';
  newDate: Date;
  newCity: string;
  newCity1: string;
  //Data object for listing items
  Usuario: any[] = []; 
  //Save first document in snapshot of items received
  previous: any = [];
  searchText: string = '';
  previous2: string;
  searchDate:Date;
  City: any[] = [];
  Ucity: any = [];

  constructor(
    private candado: CandadoServiceService,
    private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef)
    { }

  ngOnInit() {
    this.getInformacionUsuario(); 
    this.previous2 = this.mdbTable.getDataSource(); 
    this.recorrer();  
    //this.getInformacionCiudad(); 
    //this.getOneCiudad1(); 
  }

  ngAfterViewInit(){
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();

  }

  //getOneCiudad1= () => this.candado;

  getInformacionUsuario = () => this.candado
    .getInformacionUsuario()
    .subscribe(response =>{
      this.Usuario= [];
        for (let order of response) {
          this.Usuario.push(order.payload.doc.data());
        }

        for(let i = 0; i < this.Usuario.length; i++){
          this.newDate=new Date(this.Usuario[i].fechaHora);
          this.Usuario[i].fechaHora = this.newDate;
          this.Ucity[i] = this.Usuario[i].idCiudad;
          //this.recorrer();
        }

        //this.recorrer();
        
        this.Usuario.sort((a,b)=>b.fechaHora.getTime()-a.fechaHora.getTime());

        this.mdbTable.setDataSource(this.Usuario);//nuevo
        this.Usuario= this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();

        this.recorrer();  
           
    });
    
    recorrer(){

      for(let i = 0; i < this.Ucity.length; i++){
        this.newCity = this.Ucity[i];
        this.getInformacionCandado();
      }
      //console.log( this.newCity)
    }
    
    getInformacionCandado = () => this.candado
    .getOneCiudad()
      .subscribe(resp => {
        this.City= [];
        
            this.City = resp;
            //this.newCity1 = this.City.nombreCiudad;
       
    });

    searchItems(algo) {
      const prev = this.mdbTable.getDataSource();
  
      if (!this.searchText) {
        this.mdbTable.setDataSource(prev);
        this.Usuario = this.mdbTable.getDataSource();
      }
  
      if (this.searchText) {
        this.Usuario = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev);
      }
    }

}


 /*//this.prube = [];
       
 this.prube1 = resp.payload.data();
 //this.count = this.count + 1;
 //this.prube1 = this.mdbTable.getDataSource();          
 console.log(this.prube1)
 this.Usuario[i].idCiudad = this.getOneCiudad1();*/