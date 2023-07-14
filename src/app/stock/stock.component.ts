import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from './stock';
import { StockService } from './stock.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { identifierName } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, LineController,LinearScale,LineElement,CategoryScale,PointElement } from 'chart.js';
import * as moment from 'moment';

// declare var $ :any;
// export interface Data {
//   stockPrice: number;
//   setAt: string;
//   company_code_fk: number;
// }
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  @ViewChild('stockForm') form: NgForm | any;
  constructor(private http:HttpClient, private readerService: StockService,private route:ActivatedRoute,private router:Router) 
  { 
    this.route.params.subscribe(params=>console.log(params))
    this.route.params.subscribe(params=>this.getAllStocks(params['companyCode']))
    //this.route.params.subscribe(params=>this.getAllStocks())
    Chart.register(LineController, LineElement, LinearScale,CategoryScale,PointElement);
  }
  // dtOptions: DataTables.Settings = {};
listData:MatTableDataSource<any> | any;

  jobForm = new FormGroup({
    stockPrice: new FormControl(''),
    setAt: new FormControl(''),
    company_code_fk: new FormControl(''),
  });
  preview: string = '';
  ngOnInit(): void {
    //datepicker on change
  //   $('.dateadded').on( 'change', function (ret :any) {
 
  //     var v = ret.target.value  // getting search input value
      
  //     $('#dataTables-example').DataTable().columns(3).search(v).draw();
  // } );
  }
  save() {
    this.preview = JSON.stringify(this.jobForm.value);
  }
  readerObj: Stock = new Stock();
  readerList: Array<Stock> =[];
  data:{}|any;
  displayedColumns: string[]=['transactionId','stockPrice','setAt','company_code_fk'];

  setValue(id:number)
  {
  //   console.log(id);
  this.readerObj.company_code_fk=id;
  console.log(this.readerObj);
  //   let current=this.readerList.find((c)=>{return c.company_code_fk===id});
  //    console.log(current);
  //   this.form.setValue({
  //     company_code_fk:current?.company_code_fk
  //   });
  //   console.log(this.form);
   }
  addStock(bid:number)
  {
    console.log(bid);
    console.log(this.readerObj);
    // this.setValue(bid);
    this.readerService.addStock(bid, this.readerObj).subscribe(data=>
      {
        this.data = JSON.stringify(data);
        this.readerList.push(this.data);
        alert("Stock data added to Stock and company Table");
         window.location.reload();
      })
      
  }

bookm: Stock= new Stock();
bookData: Array<Stock>=[];
companyId:number|any;
response:any;
  getAllStocks(bid:number)
  //getAllStocks()
  {
    //this.response.addHeader("Access-Control-Allow-Origin", "*"); //HEADER
    //const addHeader=new HttpHeaders().set('Access-Control-Allow-Origin','*');
    //this.response.add;
    console.log(bid);
     this.setValue(bid);
    //console.log(this.bookm.company_code_fk);
    this.readerService.getAllStocks(bid).subscribe(data=>
      {
        // console.log(this.bookm.company_code_fk);
        console.log(data);
          console.log(this.bookm.stockPrice);
        this.bookData = Object.values(data);
        console.log(this.bookData);
        
        this.data = JSON.stringify(data);

        //add bookData in matDatble
this.listData=new MatTableDataSource(this.bookData);
console.log(this.listData);
        // this.getAverageStockPrice()
        //console.log(this.bookOb.stockList);
      },
      error=>
      {
        // alert("Record not present");
        console.log(error);
      })
    
    //  this.readerService.getAllStocks(this.companyId).subscribe(data=>{
    //   console.log(Object.values(data));
    //   this.bookData=Object.values(data);
    //  },
    //  error=>{
    //   console.log(error);
    //  })

  }
public averageStockPrice:number |any;
public maxStockPrice:number |any;
public minStockPrice:number |any;

  getAverageStockPrice()
  {
    let total=0;
    let max=0,min=this.bookData[0].stockPrice;

    for(let index=0;index<this.bookData.length;index++)
    {
      const stockel=this.bookData[index];
      if(stockel.stockPrice>max)
      {
        max=stockel.stockPrice;
      }
      if(stockel.stockPrice<min)
      {
        min=stockel.stockPrice;
      }
      total=total+stockel.stockPrice;
    }
    this.averageStockPrice=total/this.bookData.length;
    this.maxStockPrice=max;
    this.minStockPrice=min;

  }

  goToLogout()
  {
    this.router.navigate(['logout'])
  }

  // dtOptions: DataTables.Settings = {};
  //    ngOnInit() {
     
  //     //datepicker on change
  //     $('.dateadded').on( 'change', function (ret :any) {
 
  //       var v = ret.target.value  // getting search input value
        
  //       $('#dataTables-example').DataTable().columns(3).search(v).draw();
  //   } );
  //   }

public chart: any;
createChart(){
  
console.log(this.bookData);
const date = moment(this.bookData[0].setAt).format('L');
console.log(date); // 4/17/2020
var db = JSON.stringify(date);
var xAxis=new Array();
var yAxis=new Array();
for(let i=0;i<this.bookData.length;i++)
{
  xAxis[i]=moment(this.bookData[i].setAt).format('L');
  
  yAxis[i]=( this.bookData[i].stockPrice);
  
}
console.log(xAxis);
console.log(yAxis);
var stringDate = JSON.parse(db);
console.log(stringDate); 
console.log(this.bookData[0].stockPrice);
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {
        labels : xAxis,
        datasets: 
        [{label: "Price",
          data : yAxis,
          backgroundColor: 'blue'
        }]
      },
      options: {    
        scales:{
          y:{
            ticks:{
              display: true,
              color:'black'
            }
          },
          x:{
            title:{
              text:'TimeStamp'
            },
            ticks:{
              display: true,
              color:'black',
              
            }
          }
        }  , 
        aspectRatio:2.5,
        borderColor:"black"      
       }
      //}
      
    });
  }

  filterDate()
  {
    let start_date = this.dateRange.value.start.toLocaleDateString("en-US");  
    let end_date = this.dateRange.value.end.toLocaleDateString("en-US");
    console.log(start_date);
    console.log(end_date);
    
    this.bookData = this.bookData.filter(f =>new Date(f.setAt) > new Date(start_date) && new Date(f.setAt) < new Date(end_date));
    console.log(this.bookData); //filter result
    // window.location.reload();
  }


}
