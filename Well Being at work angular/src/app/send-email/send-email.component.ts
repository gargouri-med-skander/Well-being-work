import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestePasswordComponent } from '../reste-password/reste-password.component';
import { EmployeesServiceService } from '../services/employees-service.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
email:string;
  
  
  
  constructor(
  private matDialogRef:MatDialogRef<SendEmailComponent>
  ,private employeeService:EmployeesServiceService,
  private router:Router,private matDialog:MatDialog) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.matDialogRef.close();
  }
  ngOnDestroy(){
    this.matDialogRef.close();
  }
  sendEmail(){
    this.employeeService.sendEmail(this.email).subscribe(data=>{
      if(data){
        this.matDialog.open(RestePasswordComponent,{
          data:this.email,
          width:"600px"
        });

        this.matDialogRef.close();
alert("check your email");
      }
else {
  alert("email not found !!");
}
      
    });
  }

}
