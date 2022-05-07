import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { employee } from '../model/employee';
import { AuthentificationService } from '../services/authentification.service';
import { EmployeesServiceService } from '../services/employees-service.service';
import { TokenStorageService } from '../token-storage.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)private data:employee,
  private matDialogRef:MatDialogRef<SettingComponent>
  ,private employeeService:EmployeesServiceService,
  private storage:TokenStorageService
  ,private auth:AuthentificationService,
  private router:Router) { }



  employeAuthenticated:employee;
username:string;
  


ngOnInit(): void {
    this.employeAuthenticated=this.data;
  console.log( this.employeAuthenticated);
  this.username=this.employeAuthenticated.username;
  
}
ngOnDestroy(){
  this.matDialogRef.close(this.data);
}
closeDialog(){
  this.matDialogRef.close();
}
//fileee upload
selectedFile: any=null;
onFile(event:Event){
  this.selectedFile=event.target.eventListeners;
}
newFile:string;
changeProfil(){
  $("#divAlertOld").html("");
  $("#divAlert").html("");
  this.employeeService.savePicture().subscribe();
}
//tofa file upload
oldPass:string;
Pass:string;
changePassword(){
  $("#divAlertOld").html("");
  $("#divAlert").html("");
  var password = $("#newpass").val();
  var confirmPassword = $("#repeatpass").val();
  if (password != confirmPassword){
      $("#divAlert").html("Passwords does not match!");
  }
  else{
  this.employeeService.verifPass(this.oldPass).subscribe(data=>{
    console.log(this.oldPass);
    console.log(data);
    if(data){
      this.employeeService.savePassword(this.Pass).subscribe();
      alert("password changed !");
    }
    else{
      $("#divAlertOld").html("wrong password!");
    }
  })
  }
}

changeEmail(){
  this.employeeService.saveEmail(this.employeAuthenticated.email).subscribe(data=>{
    
    this.auth.logOut().subscribe();

    sessionStorage.clear();
    this.matDialogRef.close(this.data);
    this.router.navigate(['/signIn']);
  }, error => {
    //alert("email already Exist !!");
    

})
}

changeDate(){
let dateStr=this.employeAuthenticated.dateOfBirth.toString();
this.employeeService.saveEmail(dateStr).subscribe();
}

changeUsername(){
  this.employeeService.saveUsername(this.username).subscribe(data=>{
    this.auth.logOut().subscribe();

    sessionStorage.clear();
    this.matDialogRef.close(this.data);
    this.router.navigate(['/signIn']);
  }, error => {
    //alert("username already Exist !!");
    

})

}

changeLastName(){
  this.employeeService.saveLastName(this.employeAuthenticated.lastName).subscribe();
}

changeFirstName(){
  this.employeeService.saveFirstName(this.employeAuthenticated.firstName).subscribe();
}
changeInfo(){
  $("#divAlertOld").html("");
  $("#divAlert").html("");
  this.changeFirstName();
  this.changeLastName();
  this.changeDate();
}
changeEmailAndUsername(){
  $("#divAlertOld").html("");
  $("#divAlert").html("");
  this.changeUsername();
  this.changeEmail();
}
}


