import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent   {

  miFormulario: FormGroup=this.fb.group({
    name: ['Fernando',[Validators.required,Validators.maxLength(30)]],
    email: ['test1@gmail.com',[Validators.required,Validators.email]],
    password: ['123456',[Validators.required,Validators.minLength(6)]]
  });

  constructor(private fb:FormBuilder) { }


  registro(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }

}
