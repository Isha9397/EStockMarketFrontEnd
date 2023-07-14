import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient)
   { }

   books: Company[] |any;

  //  private apiGet:string=' https://b1pj2i33uf.execute-api.us-west-2.amazonaws.com/DeployProxyGetAll/mycompanyresource';
  private apiGet:string =`http://localhost:8081/api/v1/getAll`;
   //private apiGet:string =' https://b1pj2i33uf.execute-api.us-west-2.amazonaws.com/DeployTrialGetCompany/mytrialgetcompanydetails';
   private apiPost:string =`http://localhost:8081/api/v1/addCompany`;
  //  private apiPost:string ='https://b1pj2i33uf.execute-api.us-west-2.amazonaws.com/DeployProxyPost/mycompanyresource';
  private apiDelete:string =`http://localhost:8081/api/v1/deleteCompany`;
  //  private apiDelete:string ='https://b1pj2i33uf.execute-api.us-west-2.amazonaws.com/DeployCompanyIsha';
   private apiUpdate:string =`http://localhost:8081/api/v1/updateCompany`;
   //private apiUpdate:string ='https://b1pj2i33uf.execute-api.us-west-2.amazonaws.com/DeployProxyPut/mycompanyresource';
   private apiGetById:string =`http://localhost:8081/api/v1/getCompany`;
   //private apiGetById:string ='https://b1pj2i33uf.execute-api.us-west-2.amazonaws.com/DeployCompanyIsha';


   addUpdateStockPrice(bookObj:Company): Observable<Company>
   {
     return this.http.post<Company>(this.apiPost,bookObj);
   }

   getAll():Observable<Array<Company>>
   {
    const token: any = localStorage.getItem('jwtToken');
    console.log(token);
  
    // const headers = new HttpHeaders({ Authorization: 'Bearer Token ' + btoa(username + ':' + password) });
     const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
     headers.append('Access-Control-Allow-Origin' , '*');
    // const headers = new HttpHeaders({Authorization: `Bearer ${token.accesstoken}`});
    console.log(headers);
      return this.http.get<Array<Company>>(this.apiGet);
   // return this.http.get<Array<Company>>(this.apiGet,{headers});
   // return this.http.get<Array<Company>>(this.apiGet,{ headers });

   }

   deleteCompany(bid:number): Observable<Company>
   {
     return this.http.delete<Company>(`${this.apiDelete}/${bid}`);
   }

   getCompanyByCode(bid:number):Observable<Company> //Observable<Array<Book>> //Observable<Book>
   {
     //return this.http.get<Array<Book>>(`${this.apiGetById}/${bid}`);
     const token: any = localStorage.getItem('jwtToken');
     const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
     return this.http.get<Company>(`${this.apiGetById}/${bid}`,{headers});
    
   }

   updateCompany(bookObj:Company):Observable<Company>
   {
    const token: any = localStorage.getItem('jwtToken');
     const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
     return this.http.put<Company>(this.apiUpdate,bookObj,{headers});
   }
}
