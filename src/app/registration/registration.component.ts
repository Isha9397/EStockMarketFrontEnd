import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from './registration';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router,private registrationService:RegistrationService) { }
  registerOb:Registration = new Registration();
  data:{}|any;
  registerarr:Array<Registration>=[];

  ngOnInit(): void {
  }

  register()
  {
    console.log(this.registerOb);
    this.registrationService.addUser(this.registerOb).subscribe((data: any)=>
      {
        this.data = JSON.stringify(data);
        console.log(this.data);
        this.registerarr.push(this.data);
        this.router.navigate(['login'])
  },
      (  error: any)=>
  {
    //alert("Please check values");
    console.log(error);
  })
}
}
