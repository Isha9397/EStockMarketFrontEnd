import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParamMap, Router } from '@angular/router';
import { Stock } from '../stock/stock';
import { Company } from './company';
import { CompanyService } from './company.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

export interface UserData {
  companyCode: number;
  companyName: string;
  companyCEO: string;
  companyTurnOver: number;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
searchText:string | any;

  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild('bookForm') form: NgForm | any;
  public departmentId: any|any;
  constructor(private bookService:CompanyService, private http:HttpClient,private router:Router,private route:ActivatedRoute)
   {
    
    // this.route.params.subscribe(params=>console.log(params))
    // this.route.params.subscribe(params=>this.getAllStocks(params['companyCode']))
    //const us=Array.from({length: 100}, (_, k) => this.addCompanyDetails());
    this.dataSource = new MatTableDataSource();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
   displayedCol=['companyCode','companyName','companyCEO','companyTurnOver','companyWebsite','excahngeName','stockPrice']
  ngOnInit(): void {
    this.getCompanyList();

    this.route.paramMap.subscribe((params: ParamMap) => {
      let companyCode = (params.get('companyCode'));
      this.departmentId = companyCode;
    });
  }

  

  // onSubmit()
  // {
  //   this.router.navigate(['/stock:companyCode'])
    
  // }

  bookOb:Company = new Company();
  bookarr:Array<Company>=[];
  public selectedName:any;
  data:{}|any;

  addCompanyDetails()
  {
    this.bookService.addUpdateStockPrice(this.bookOb).subscribe(data=>
      {
        this.data = JSON.stringify(data);
        console.log(this.data);
        this.bookarr.push(this.data);
       // window.location.reload();
       alert("Data Have been Added successfully ");
       window.location.reload();
      //  this.getCompanyList();
      },
      error=>
      {
        //alert("Please check values");
        console.log(error);
      })
  }
  getCompanyList()
  {
    this.bookService.getAll().subscribe(data=>
      {
        this.bookarr = Object.values(data);
       console.log(this.bookarr);
       //this.getAverageStockPrice();
        //console.log(this.bookOb.stockList);
      },
      error=>
      {
        console.log(error);
      })
  }

  // getCompanyList(bid:number)
  // {
  //   if(bid==null)
  //   {
  //   this.bookService.getAll().subscribe(data=>
  //     {
  //       this.bookarr = Object.values(data);
  //      console.log(this.bookarr);
  //      //this.getAverageStockPrice();
  //       //console.log(this.bookOb.stockList);
  //     },
  //     error=>
  //     {
  //       console.log(error);
  //     })
  //   }
  //   else{
  //     this.getCompanyByCode(bid);
  //   }
  // }
   averageStockPrice:number |any;
 maxStockPrice:number |any;
 minStockPrice:number |any;

  getAverageStockPrice()
  {
    this.bookService.getAll().subscribe(data=>
      {
        this.bookarr = Object.values(data);
    let total=0;
    let max=0,min=this.bookarr[0].stockPrice;

    for(let index=0;index<this.bookarr.length;index++)
    {
      const stockel=this.bookarr[index];
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
    this.averageStockPrice=total/this.bookarr.length;
    console.log(this.averageStockPrice);
    this.maxStockPrice=max;
    console.log(this.maxStockPrice);
    this.minStockPrice=min;
    console.log(this.minStockPrice);
  },
  error=>
  {
    console.log(error);
  })
  }


  deleteCompany(bid:number)
  {
    console.log(bid);
    this.bookService.deleteCompany(bid).subscribe(data=>
      {
        let comIndex = this.bookarr.findIndex(c=>c.companyCode == bid);
        this.bookarr.splice(comIndex,1);
        alert("Company record is deleted");
        window.location.reload();
        // this.getCompanyList();
      },
      error=>
      {
        console.log(error);
      })
  }

  updateCourse(id:number,courseObj:Company)
  {
    // this.bookService.updateCompany(courseObj).subscribe(data=>
    //   {
    console.log(id);
    let current=this.bookarr.find((c)=>{return c.companyCode===id});
    console.log(current);
    this.form.setValue({
      companyCode:current?.companyCode,
      companyName:current?.companyName,
      companyCEO:current?.companyCEO,
      companyWebsite:current?.companyWebsite,
      companyTurnOver:current?.companyTurnOver,
      exchangeName:current?.exchangeName
      // stockPrice:current?.stockPrice
          });

alert("Please Update record");
     // },
      
      // error=>
      // {
      //   console.log("error "+error);
      // })
    //   {
    //     let current=this.courses.find((c)=>{return c.id===id});
    //     console.log(current);
    //     console.log(this.form);

    

    //     this.editMode=true; 
    //     //this.courseService.performUpdate(id,new Course);
    //     return this.http.put(`${this.dbUrl}/${id}`,value).subscribe();
      }

      submitUpdated(courseObj:Company)
      {
        this.bookService.updateCompany(courseObj).subscribe(data=>
        {
          alert("New Records have been updated");
          window.location.reload();
          // this.getCompanyList();
        },
        error=>
      {
        console.log("error "+error);
      })
      }

      getStockRouting(companyCode:number)
      {
        // this.router.navigate(['/stock:companyCode'])
        //  this.router.navigate(['stock',companyCode])
         this.router.navigate(['stock/getAllStocks',companyCode])
      }

bookm: Company= new Company();
bookData: Array<Company>=[];
response:any;
  getCompanyByCode(bid:number)
  {
    console.log(this.bookarr);
    if(bid!=null)
    {
    this.bookService.getCompanyByCode(this.bookm.companyCode).subscribe(data=>
      {
        // this.bookData = Object.values(data);
        // this.data = JSON.stringify(data);
        // console.log(this.data);

        this.bookarr = Object.values(data);
        console.log(this.bookarr);

        
         alert(this.bookarr);
          window.location.reload();
       //this.getCompanyList();
        
      })
    }

  }

  editContact(contact: Company) {
      // let route = "['/stock/getAllStocks',contact]";
      let route = '/stock/getAllStocks';
      
      console.log(contact);
      //let route = '/stock';
     console.log(route);
     
    // this.router.navigate([route], { queryParams: { companyCode: contact.companyCode } });
    this.router.navigate(['stock/getAllStocks', {companyCode: contact} ]);
    // this.router.navigate(["item",{ contact: contact }]);
     //this.router.navigate([route],{ queryParams:{}});
  
    //alert("clickable"+contact.companyCode);
  }

  goToLogout()
  {
    this.router.navigate(['logout'])
  }


  // popupTable()
  // {
  //   this.dialog.open(CompanyComponent);
  // }







  
}
