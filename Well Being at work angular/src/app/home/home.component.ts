import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from '../model/employee';
import { AuthentificationService } from '../services/authentification.service';
import { EmployeesServiceService } from '../services/employees-service.service';
import { TokenStorageService } from '../token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  employeAutenticated: employee;
  checkAuth: boolean;
  employeeList: employee[] = [];

  constructor(private authService: AuthentificationService, private router: Router
    , private tokenStorag: TokenStorageService, private employeeService: EmployeesServiceService
    ,private matDialog:MatDialog) { }
  ngOnInit(): void {
//parti recherche
$(document).ready(() => {
  $("#searchID").keyup(() => {
    
    var tab = this.employeeList;
    var value = $("#searchID").val();
    var search = $("#resultat");
    $("#resultat").empty();
    $("#oldAffich").hide();
    if (value != "") {
      for (let x of tab) {
        var ff = value.toString();
        var username =x.username.toLowerCase();
          if (username.startsWith(ff, 0)||username.includes(ff,0)) {
            var element_search = $("#" + x.idEmployee);
            element_search.clone().appendTo(search);
          }
       
    }
  }
    else {
      $('#oldAffich').show();
      $('#resultat').empty();
      $('#resultat').fadeIn('fast');
    }

  });
});



//tofa lena 

    
    if (this.tokenStorag.getUsername() != null) {
      this.username = this.tokenStorag.getUsername();
      this.employeeService.getEmployes().subscribe(
        data => {
          this.employeeList = data
        }
      );
      this.employeeService.getEmploye(this.username).subscribe(data => {
        this.employeAutenticated = data;
      })
    }
    else {
      this.router.navigate(['/signIn']);
    }
  }
  logOutFunction() {
    this.authService.logOut().subscribe(data => {
      console.log(data)
    });

    sessionStorage.clear();
    this.router.navigate(['/signIn']);
  }
  openSetting(){
    let dialogRed =this.matDialog.open(SettingComponent,{
      data:this.employeAutenticated,
      width:"600px"
    });
    dialogRed.afterClosed().subscribe(result =>{
      this.employeAutenticated=result;
    })
  }

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it

}
