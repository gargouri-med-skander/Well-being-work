import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from '../model/employee';
import { AuthentificationService } from '../services/authentification.service';
import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:string;
  checkAuth:boolean ;
  constructor(private authService:AuthentificationService,private router:Router,private tokenStorag:TokenStorageService) { }

  ngOnInit(): void {
    this.username=this.tokenStorag.getUsername();
  }
  logOutFunction(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
