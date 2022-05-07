import { Component, OnInit } from '@angular/core';
import { loginRequest } from '../model/loginRequest';
import { AuthentificationService } from '../services/authentification.service';
import { first } from 'rxjs/operators'
import { Router } from '@angular/router';
import { jwtResponse } from '../model/jwtResponse';
import { HttpHeaders } from '@angular/common/http';
import { SendEmailComponent } from '../send-email/send-email.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  login: loginRequest = new loginRequest();
 
  email:string;
  constructor(private matDialog:MatDialog,private authService: AuthentificationService, private router: Router) {
  }
  dataString: string;
  form: any = {};
  loginfailed = false;
  responseJWT = new jwtResponse();
  loginUser(loginreq: loginRequest) {
    this.authService.SignInEmployee(loginreq)
      .pipe(first()).subscribe(
        data => {
          this.loginfailed = false;
          this.router.navigate(['']);
        }, error => {
          alert("username or password wrong !!");
          this.loginfailed = true;
        }
      )
  }
  ngOnInit(): void {

  }
  openForgotPass(){
    this.matDialog.open(SendEmailComponent,{
     
      width:"600px",
    });
    
  }
}


