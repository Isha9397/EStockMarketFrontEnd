import { Stock } from "../stock/stock";

export class Company
 {
    companyCode: number |any;
    companyName: string |any;
    companyCEO: string |any;
    companyTurnOver: number | any;
    companyWebsite: string |any;
    exchangeName: string|any;
   // ReaderName!: string ;

   stockPrice: number | any;
    readerList : Array<Stock>=[];

}
