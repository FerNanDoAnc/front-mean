import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent   {

  get usuario(){
    return this.authService.usuario;
  }

  miFormulario: FormGroup=this.fb.group({
    name: ['Fernando',[Validators.required,Validators.maxLength(30)]],
    email: ['test1@gmail.com',[Validators.required,Validators.email]],
    password: ['123456',[Validators.required,Validators.minLength(6)]]
  });

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService

  ) { }


  registro(){
    const {name,email,password}=this.miFormulario.value;

    this.authService.registro(name, email,password)
      .subscribe( ok=>{

        if(ok===true){
          this.router.navigateByUrl('/dashboard');
          
          Swal.fire({
            title: 'Cuenta creada',
            html: 'Bienvenido: '+this.usuario.name,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            width: 350
          });

        }else{
          Swal.fire({
            title: '!Error!',
            text: ''+ok+'!',
            icon: 'error',
            timer: 2500,
            confirmButtonText: 'Ok',
            width: 350
          });
        }

      });

  }

}
