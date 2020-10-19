import { Component,  } from '@angular/core';
import {AuthServiceService} from '../auth-service.service'
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { CandadoServiceService } from '../candado-service.service';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
// import { Ciudad } from '../ciudad.model'


@Component({
  selector: 'app-register-component',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent{
  //Ciudad: object;
  //ciudades:object[];
  Ciudades: any[] = [];
  idCiudades: any[] = [];
  idCiudad: string;
  ciudadUsuario: string;
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  successMessage2: string = '';
  persona: string;
  tipoID: string;
  numeroDoc: string;
  numIMEI: string;
  entidad: string;
  telefono: string;
  mail: string;
  clave: string;
  flagsFields: boolean;
  errorFields: string;
  charespecial : string;
  usuario: {
    IMEI: string,
    entidad: string,
    id: string,
    idCiudad: string,
    mail: string,
    nombre: string,
    perfil: string,
    telefono: string,
    tipoId: string
  };
  constructor(
    public authService: AuthServiceService,
    private router: Router,
    private fb: FormBuilder,
    private ciudad: CandadoServiceService

  ) {
    // this.createForm();
    // this.createForm1();
   }

   ngOnInit() {
     this.obtenerCiudades();
   }

   obtenerCiudades () {
    this.ciudad.getCiudades().subscribe(response =>{ 
        this.Ciudades = [];
        this.idCiudades = [];
        
        for (let order of response) {
          this.idCiudades.push(order.payload.doc.id)
          this.Ciudades.push(order.payload.doc.data()['nombreCiudad']);
        }
        // console.log('las ciudades :', this.Ciudades, this.idCiudades);
        //console.log('Ciudades : ',this.Ciudades)
      
    }, error => {
    });
   }

   validarCadena (cadena: string) {
    this.charespecial = '|°¬!#$%&/()=?¡¿"+{}-.,;:[]~><^';
    const text = cadena;
    for (let i = 0; i < text.length; i++) {
      for(let j = 0; j < this.charespecial.length; j++){
        if(text.charAt(i) == this.charespecial.charAt(j)){
          this.errorMessage = 'No se guardó usuario - error en nombres: caracter especial detectado ' + this.charespecial.charAt(j)
          this.flagsFields = false
          break;
        }
          
          
      }
      
    }
   }


   onSubmit() {
    // console.log('Id ciudades : ', this.idCiudad);
    // console.log('Objeto : ', this.usuario);
    // console.log('ciudad : ',this.ciudadUsuario);
    this.flagsFields = true;
    
    this.idCiudad = this.idCiudades[this.Ciudades.indexOf(this.ciudadUsuario)];
    this.usuario = {
      IMEI: this.numIMEI,
      entidad: this.entidad,
      id: this.numeroDoc.toString(),
      idCiudad: this.idCiudad,
      mail: this.mail,
      nombre: this.persona,
      perfil: 'TuCmJa3tPzkHEocAW0S8',
      telefono: this.telefono.toString(),
      tipoId: this.tipoID
    }

    if( this.persona.length < 4){
      this.errorMessage = 'No se guardó usuario - error: '
      this.errorMessage += ' long. nombre menor a 4 caracteres'
      console.log(this.errorMessage)
      this.flagsFields = false;
    }
    if( this.clave.length < 6){
      this.errorMessage = 'No se guardó usuario - error: '
      this.errorMessage += ' long. contraseña menor a 6 caracteres'
      console.log(this.errorMessage)
      this.flagsFields = false;
    }
    this.validarCadena(this.persona);

    

    if (this.authService.form.valid) {
      console.log('Invadlid lin detected') 
    }
    if(this.flagsFields){
      this.authService.doRegister(this.mail, this.clave)
      .then(res => {
       //  console.log(res);
        this.errorMessage = '';
        this.successMessage = "Credenciales registradas";
        this.authService.createUser(this.usuario)
        .then(res => {
         this.successMessage2 = "Usuario registrado en base de datos";
        }, err => {
         // console.log(err);
         this.errorMessage = err.message;
         this.successMessage = "";
        });
 
      }, err => {
       //  console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })    
    }
 
  }

}
