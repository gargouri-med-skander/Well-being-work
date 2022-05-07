import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeesServiceService } from '../services/employees-service.service';

@Component({
  selector: 'app-reste-password',
  templateUrl: './reste-password.component.html',
  styleUrls: ['./reste-password.component.css']
})
export class RestePasswordComponent implements OnInit {
code:string ;
newPass:string ;
email:string;

  constructor(@Inject(MAT_DIALOG_DATA)private data:string,private matDialogRef:MatDialogRef<RestePasswordComponent>
    ,private employeeService:EmployeesServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.email=this.data;
  }
  closeDialog(){
    this.matDialogRef.close();
  }
  ngOnDestroy(){
    this.matDialogRef.close();
  }
  saveNewPass(){
    this.employeeService.restePass(this.email,this.code,this.newPass).subscribe(data=>{
      if(data){
        this.matDialogRef.close();
        this.router.navigate(['/signIn']);
alert("pasword changed successfully ");
      }
      else{
        alert("code wrong !! ");
      }
    })
  }
}
