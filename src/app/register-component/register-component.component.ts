import { Component,  } from '@angular/core';
import {AuthServiceService} from '../auth-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    
    private fb: FormBuilder
  ) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required]
     });
   }

   tryRegister(value){
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
   }

    usuarios = [];
    addCoffee = coffee => this.usuarios.push(coffee);

   onSubmit() {
    this.authService.form.value.IMEI = this.usuarios;
    let data = this.authService.form.value;
    
   this.authService.createUser(data)
       .then(res => {
           /*do something here....
           maybe clear the form or give a success message*/
       });
  }
  

}
