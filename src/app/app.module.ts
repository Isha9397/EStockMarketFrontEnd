import { Component, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { StockComponent } from './stock/stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDateRangeSelectionStrategy,DateRange,MAT_DATE_RANGE_SELECTION_STRATEGY,} from '@angular/material/datepicker';
import {DateAdapter} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
// import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { SerachFilterPipe } from 'search-filter.pipe';
import { TokenInterceptor } from './TokenInterceptor/token-interceptor';


export const routes = [
  {path:'',component: CompanyComponent},
  {path:'stock/getAllStocks',component: StockComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    StockComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    RegistrationComponent,
    SerachFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule
    
    
  ],
  exports: [
    MatFormFieldModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents:[CompanyComponent]
})



export class AppModule { }
