import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private authenticateservice: AuthenticationService, private loginService:LoginService) { }

  ngOnInit() {
  }
  // checkLogin() {
  //   if (this.authenticateservice.authenticate(this.username, this.password)) 
  //   {
  //     this.router.navigate(['company'])
  //     this.invalidLogin = false
  //   } else
  //   alert("Invalid Login credentials");
  //     this.invalidLogin = true
  // }
  loginOb:Login = new Login();
  checkLogin()
  {
    this.loginService.postLogin(this.loginOb).subscribe((response:any)=>{
      // if(response.message!="User Successfully logged in")
      // {
      //   alert("Login Fail");
      // }
      // else
      // {
      alert(response.message);
      localStorage.setItem('jwtToken',response.token);
      //sessionStorage.setItem('jwtToken',response.token);
      this.router.navigate(['company'])
      //}
    })
  }

  ifNotRegister()
  {
    this.router.navigate(['registration'])
  }
  // checkLogin() {
  //   // (this.loginservice.authenticate(this.username, this.password).subscribe(
  //     if (this.loginservice.authenticate(this.username, this.password))
  //     {data => {
  //     this.router.navigate([''])
  //     this.invalidLogin = false
  //     },
  //     error => {
  //   this.invalidLogin = true
  //     }

  // form = new FormGroup({
  //   username: new FormControl(),
  //   pwd: new FormControl(),
  // })
  
  // constructor(private service: LoginService) { }

  // ngOnInit(): void {
  // }

  // loginCheck(){
  //   this.service. postLogin(this.form.value).subscribe((response:any)=>{
  //     if(response.status == false){
  //       alert(response.message)
  //       return false
  //     }

  //     localStorage.setItem('jwttoken',response.token)
  //     window.location.href = "/user"

  //   })
  // }



}
