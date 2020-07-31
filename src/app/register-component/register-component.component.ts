import { Component,  } from '@angular/core';
import {AuthServiceService} from '../auth-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent{

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.createForm1();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required]
     });
    }

    createForm1() {
     this.authService.form = this.fb.group({
      IMEI: ['', Validators.required ],
      entidad: ['', Validators.required ],
      id: ['', Validators.required ],
      mail: ['', Validators.required ],
      nombre: ['', Validators.required ],
      perfil: ['TuCmJa3tPzkHEocAW0S8', Validators.required ],
      telefono: ['', Validators.required ],
      tipoId: ['', Validators.required ]
    });
   }

   onSubmit() {

    let data = this.authService.form.value;
    //let email =this.registerForm.value.email;
    let email = this.authService.form.value.mail;
    let password =this.registerForm.value.password;

    this.authService.doRegister(email, password)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Su cuenta ha sido creada";      
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     }) 

    if (this.authService.form.valid) {
      
      this.authService.createUser(data)
       .then(res => {
           /*do something here....
           maybe clear the form or give a success message*/
       });
    }
   
       
  }
  

}
