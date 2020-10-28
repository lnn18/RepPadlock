import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CandadoServiceService } from '../candado-service.service';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { stringify } from 'querystring';
import { data } from 'jquery';


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
  //searchDateGTM: Date;
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
    .getInformacionRegistroOpt()
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

      let hours:number;  
      let resultdata: any []=[];
      const prev = this.mdbTable.getDataSource();
      let searchDateGTM: string; 
      let datearray:string;
      let datetemp: Date=new Date();


      
    

      if(this.searchDate){
        console.log('Fecha capturada del sistema : ', this.searchDate);
        datearray=this.searchDate[8]+this.searchDate[9];
        datetemp.setFullYear(parseInt(this.searchDate[0]+this.searchDate[1]+this.searchDate[2]+this.searchDate[3]));
        datetemp.setMonth(parseInt(this.searchDate[5]+this.searchDate[6])-1);
        datetemp.setDate(parseInt(this.searchDate[8]+this.searchDate[9]))

        console.log("Setting date: "+ datetemp); 
        
        datetemp.setDate(datetemp.getDate()+1);
        console.log("New date: "+ datetemp );
        searchDateGTM=(datetemp.getFullYear()).toString()+"-";

        if (datetemp.getMonth()+1<10)
           searchDateGTM+="0"+(datetemp.getMonth()+1).toString()+"-";
        else
          searchDateGTM+=(datetemp.getMonth()+1).toString()+"-";
        if (datetemp.getDate()<10)
          searchDateGTM+="0"+(datetemp.getDate()).toString();
        else
         searchDateGTM+=(datetemp.getDate()).toString();
 
        console.log("------>",searchDateGTM);
       
        /*
       // let month = (searchDateGTM.getMonth() + 1).toString(); //months from 1-12
       // let day = searchDateGTM.getDate().toString();
       // let year = searchDateGTM.getFullYear().toString();
       // let hours = searchDateGTM.getHours().toString();
       // let mins = searchDateGTM.getMinutes().toString();
        

       // if(month.length == 1){
          month = '0' + month;
        }
        if(day.length == 1){
          day = '0' + day;
        }

        dateGTM = year + "-" + month + "-" + day
        horaMins = ' ' + hours + ':' + mins
        // dateGTM = '2020-08-06';
        //console.log('Fecha con offset Timezone : ', searchDateGTM, ' Cadena fecha : ', dateGTM, horaMins);
      */}
  
      if (!this.searchText) {
        this.mdbTable.setDataSource(prev);
        this.Candados = this.mdbTable.getDataSource();
        if(this.searchDate){

          console.log("future day");
          this.Candados=[];

          resultdata=this.mdbTable.searchLocalDataBy(searchDateGTM);
          for (let arraylength=0;arraylength<resultdata.length;arraylength++){  
            datetemp= new Date(resultdata[arraylength].fechaHora);
            hours= datetemp.getHours();
            if (hours>18){
              console.log(datetemp+'' +hours+"------>"+resultdata[arraylength]);
             
              this.Candados.push(resultdata[arraylength]);
            }
    
          }
          console.log("today");

          resultdata=this.mdbTable.searchLocalDataBy(this.searchDate);
          for (let arraylength=0;arraylength<resultdata.length;arraylength++){  
              datetemp= new Date(resultdata[arraylength].fechaHora);
              hours= datetemp.getHours();
              if (hours<19){
                console.log(datetemp+'' +hours+"------>"+resultdata[arraylength]);
              
                this.Candados.push(resultdata[arraylength]);
              }  
            }
          


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


