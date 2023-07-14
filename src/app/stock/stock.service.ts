import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) 
  { }

  //Access-Control-Allow-Origin:*;
  // app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "https://yoursite.com");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  readerList: Stock[]|any;
  private apiPostReader:string =`http://localhost:8081/api/stock/add`;
  //private apiPostReader:string =' https://b1pj2i33uf.execute-api.us-west-2.amazonaws.com/DeployCompanyIsha/mycompanyresource';
   private apiGetReader:string =`http://localhost:8081/api/stock/getAllStocks`;
  //private apiGetReader:string =' https://b1pj2i33uf.execute-api.us-west-2.amazonaws.com/DeployCompanyIsha/mycompanyresource';

  addStock(bid:number,reader:Stock):Observable<Stock>
  {
    return this.http.post<Stock>(`${this.apiPostReader}/${bid}`, reader);
  }

  getAllStocks(bid:number):Observable<Array<Stock>>
  {
    // const addHeader=new HttpHeaders()
    // .set('content-type','application/json')
    // .set('Access-Control-Allow-Origin','*');
    let addHeader = new HttpHeaders()
    addHeader=addHeader.set('content-type','application/json')
    addHeader=addHeader.set('Access-Control-Allow-Origin', '*');
    console.log(addHeader);
    //let addHeader = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json'}); 
    // return this.http.get<Array<Stock>>(`${this.apiGetReader}/${bid}`,{ 'headers': addHeader });
    // return this.http.get<Array<Stock>>(`${this.apiGetReader}`,{ 'headers': addHeader });
    return this.http.get<Array<Stock>>(`${this.apiGetReader}/${bid}`);
  }
}
