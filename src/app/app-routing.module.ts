import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StockComponent } from './stock/stock.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
   {path:'company',component: CompanyComponent,canActivate:[AuthGaurdService]},
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
  {path:'stock/getAllStocks',component: StockComponent,canActivate:[AuthGaurdService]}
  //{path:'stock/getAllStocks',component: StockComponent}
  // {path:'company',component: StockComponent},
    // {path:'stock/:companyCode',component: StockComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
