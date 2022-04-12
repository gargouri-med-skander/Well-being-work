import { Component, OnInit } from '@angular/core';
import { loginRequest } from '../model/loginRequest';
import { AuthentificationService } from '../services/authentification.service';
import {first} from 'rxjs/operators'
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
login:loginRequest=new loginRequest();
  constructor(private authService:AuthentificationService,private router:Router) { }
form:any={};
 loginfailed=false;

  ngOnInit(): void {
  }
  loginUser(loginreq:loginRequest){
   this.authService.SignInEmployee(loginreq)
   .pipe(first()).subscribe(
     data =>{
       this.loginfailed=false;
       this.router.navigate(['Home']);

     },error =>{
       
       alert("username or password wrong !!");
       this.loginfailed=true;
     }
   )
     
  }
}


