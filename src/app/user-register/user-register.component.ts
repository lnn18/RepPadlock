import { Component,  } from '@angular/core';
import {AuthServiceService} from '../auth-service.service'
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { CandadoServiceService } from '../candado-service.service';
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
      
    }, error => {
    });
   }


   onSubmit() {
    // console.log('Id ciudades : ', this.idCiudad);
    // console.log('Objeto : ', this.usuario);
    // console.log('ciudad : ',this.ciudadUsuario);
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

    if (this.authService.form.valid) { 
    }
  }
}
