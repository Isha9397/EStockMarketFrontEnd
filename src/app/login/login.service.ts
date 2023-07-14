import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  private apiPost:string =`http://localhost:8082/auth/user/login`;

  postLogin(loginObj:Login){
    // let url = `http://localhost:8080/login`;
    console.log(loginObj);
    
    return this.http.post<Login>(this.apiPost,loginObj);
    // return this.http.post(url, name,pass);
  }

}
