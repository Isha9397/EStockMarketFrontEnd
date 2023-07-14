import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from './registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  private apiPost:string =`http://localhost:8082/auth/user/registerUser`;

  addUser(registerOb:Registration): Observable<Registration>
  {
    return this.http.post<Registration>(this.apiPost,registerOb);
  }
}
