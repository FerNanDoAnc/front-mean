import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthResponse, Usuario } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _usuario!:Usuario;

  // para no cambiar el valor accidentalmente
  get usuario(){
    return {...this._usuario};
  }
  constructor(

    private http:HttpClient

  ) { }

  login(email:string,password:string){
    
    const url = `${this.baseUrl}/auth`;
    // const url = this.baseUrl + '/auth';
    const body = {email,password};
    
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp=>{
          if(resp.ok){
            // localStorage.setItem('token',resp.token!);
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
          }
        }),
        map( valid=> valid.ok),
        catchError( err=>of(err.error.message))
      )
    
  }


}
