import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CandadoServiceService } from '../candado-service.service';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { stringify } from 'querystring';


@Component({
  selector: 'app-tabla-candados',
  templateUrl: './tabla-candados.component.html',
  styleUrls: ['./tabla-candados.component.css'],
 
})

export class TablaCandadosComponent implements OnInit, AfterViewInit { // se agrego el AfterViewInit para desarrollar ejemplo de tabla
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent; //Se agregaron las lineas 14 y 15 para ejemplo de tabla
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  //fechaHora='';
  newDate: Date;
  dateTrans: Date;
  //Data object for listing items
  Candados: any[] = []; 
  //Save first document in snapshot of items received
  previous: any = [];
  searchText: string = '';
  previous2: any = [];
  searchDate:Date;
  searchDateInit:Date;
  // searchDateGTM: Date;
  fileName= 'ExcelSheet.xlsx';
  startDate = new Date('2020-07-01');
  endDate = new Date('2020-08-01');
  dateToday = new Date;
  cdate: Date;


  //fileName= 'ExcelSheet.xlsx'; 

  constructor(
    private candado: CandadoServiceService,
    private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef)
    {
    }
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


    getInformacionCandado = () => this.candado
    .getInformacionRegistro()
    .subscribe(response => { 
        this.Candados= [];
        
        for (let order of response) {
          this.Candados.push(order.payload.doc.data());
        }

        for(let i = 0; i < this.Candados.length; i++){
          // if(this.Candados[i].ts_date < 99999999999){
          //   const dateTrans = new Date(this.Candados[i].ts_date*1000);
          // }else{
          //   const dateTrans = new Date(this.Candados[i].ts_date);
          // }
          this.dateTrans = new Date(this.Candados[i].ts_date*1000);
          // const date_string = new Date(this.Candados[i].ts_date*1000).toLocaleDateString();
          
          //this.dateTrans = new Date(this.Candados[i].ts_date*1000);
          // let month = (this.dateTrans.getUTCMonth() + 1).toString(); //months from 1-12
          // let day = this.dateTrans.getUTCDate().toString();
          // let year = this.dateTrans.getUTCFullYear().toString();
          // let hours = this.dateTrans.getHours().toString();
          // let mins = this.dateTrans.getMinutes().toString();
          // let secs = this.dateTrans.getSeconds().toString();
          // let cadenahora = day + "-" + month + "-" + year  + ' ' + hours + ':' + mins + ':' + secs +  ' GTM-05';
          // cadenahora = '2020-8-12 23:50:12 GMT-00'
          // // this.dateTrans = new Date(Date.UTC(20, 08, 12, 20, 30, 10));
          // console.log('Hora cadenas : ',this.dateTrans);
          // this.newDate=this.dateTrans;
          this.newDate = new Date(this.dateTrans);
          this.Candados[i].fechaHora = this.dateTrans;
        }
        
        // console.log('breakpoint 1');
        this.Candados.sort((a,b)=>b.fechaHora.getTime()-a.fechaHora.getTime());
        // console.log('breakpoint 2');
        this.mdbTable.setDataSource(this.Candados);//nuevo
        // console.log('breakpoint 3');
        this.Candados = this.mdbTable.getDataSource();
        // console.log('breakpoint 4');
        this.previous = this.mdbTable.getDataSource();
        // console.log('breakpoint 5');

      
    }, error => {
    });

    // getInformacionCandado = () => this.candado
    // .getInformacionRegistroDate(this.startDate, this.endDate)
    // .subscribe(response => { 
    //     this.Candados= [];
    //     for (let order of response) {
    //       this.Candados.push(order.payload.doc.data());
    //     }

    //     console.log('Registros candados : ',this.Candados)

    //     for(let i = 0; i < this.Candados.length; i++){
    //       this.newDate=new Date(this.Candados[i].fechaHora);
    //       this.Candados[i].fechaHora = this.newDate;
    //     }

    //     this.Candados.sort((a,b)=>b.fechaHora.getTime()-a.fechaHora.getTime());

    //     this.mdbTable.setDataSource(this.Candados);//nuevo
    //     this.Candados = this.mdbTable.getDataSource();
    //     this.previous = this.mdbTable.getDataSource();

      
    // }, error => {
    // });

    // getInformacionCandado () {  
    //   this.candado
    //   .getInformacionRegistroDate(this.startDate, this.endDate)
    //   .subscribe(response => { 
    //           this.Candados= [];
    //           for(const order of response) {
    //             this.Candados.push(order.payload.doc.data());
    //           }
    //         });

    //   console.log('Salida push a Candado: ',this.Candados);
    
    // }

    // getInformacionCandado () {  
    //   let Result: any;
    //   Result = this.candado
    //   .getInformacionRegistroDate(this.startDate, this.endDate)
    //   Result.subscribe(
    //     response => { 
    //                 this.Candados= [];
    //                 for(let order of response) {
    //                   this.Candados.push(order.payload.doc.data());
    //                 }
    //               })
      
    //   console.log('Resultado get: ', Result);
    //   console.log('arreglo get: ', this.Candados);


      
    
    // }
    
    searchItems(algo) {
      const prev = this.mdbTable.getDataSource();
      let searchDateGTM = new Date(this.searchDate);
      let dateGTM: string;
      let horaMins: string;
      // let timezoneoffset; 

      if(this.searchDate){
        console.log('Fecha capturada del sistema : ', this.searchDate);
        searchDateGTM.setHours(searchDateGTM.getHours()+5);
        let month = (searchDateGTM.getUTCMonth() + 1).toString(); //months from 1-12
        let day = searchDateGTM.getUTCDate().toString();
        let year = searchDateGTM.getUTCFullYear().toString();
        let hours = searchDateGTM.getHours().toString();
        let mins = searchDateGTM.getMinutes().toString();
        if(month.length == 1){
          month = '0' + month;
        }
        if(day.length == 1){
          day = '0' + day;
        }

        dateGTM = year + "-" + month + "-" + day
        horaMins = ' ' + hours + ':' + mins
        // dateGTM = '2020-08-06';
        console.log('Fecha con offset Timezone : ', searchDateGTM, ' Cadena fecha : ', dateGTM, horaMins);
      }
  
      if (!this.searchText) {
        this.mdbTable.setDataSource(prev);
        this.Candados = this.mdbTable.getDataSource();
        if(this.searchDate){
          // this.Candados = this.mdbTable.searchLocalDataBy(dateGTM);
          this.Candados = this.mdbTable.searchLocalDataBy(this.searchDate);
        }
        
      }
  
      if (this.searchText) {
        
        if(this.searchDate){
          
          const text_f = this.mdbTable.searchLocalDataBy(this.searchText);
          this.mdbTable.setDataSource(text_f);
          // this.Candados = this.mdbTable.searchLocalDataBy(dateGTM);
          this.Candados = this.mdbTable.searchLocalDataBy(this.searchDate);
         
          
        }else{
          this.Candados = this.mdbTable.searchLocalDataBy(this.searchText); 
        }
        this.mdbTable.setDataSource(prev);
      }
    }

    busquedaFecha(algo){
      // this.getInformacionCandado(); 
      // this.previous2 = this.mdbTable.getDataSource();  
      // console.log('Evento de cambio de fecha Inicial: ',this.searchDate)
      
      console.log('Búsqueda por fecha')
      // const prev = this.mdbTable.getDataSource();
      // this.mdbTable.setDataSource(this.mdbTable.searchLocalDataBy(this.searchDate));
      // if (this.searchText) {
      //   this.Candados = this.mdbTable.searchLocalDataBy(this.searchText); 
      // }else{
      //   this.Candados = this.mdbTable.getDataSource();
      // }
      
    }

    exportCSV(){
      new ngxCsv(this.Candados, 'My Report');    
    }
    
    exportexcel(): void     {
      let timeSpan = new Date().toISOString();
      let prefix = name || "ExportResult";
      let fileName = `${prefix}-${timeSpan}`;
      let targetTableElm = document.getElementById("example");
      let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
      XLSX.writeFile(wb, `${fileName}.xlsx`);
      }

}


