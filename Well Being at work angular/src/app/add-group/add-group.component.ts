import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { employee } from '../model/employee';
import { groupChat } from '../model/groupChat';
import { ChatGroupServiceService } from '../services/chat-group-service.service';
import { EmployeesServiceService } from '../services/employees-service.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  username: string;
  employeAutenticated: employee;
  listEmployees:employee[]=[];
  listEmployeeChossen:employee[]=[];
  nameGroupe:string;


  constructor(@Inject(MAT_DIALOG_DATA)private data:employee,
  private matDialogRef:MatDialogRef<AddGroupComponent>
  ,private employeeService:EmployeesServiceService,
  private storage:TokenStorageService
  ,private chatGroupService:ChatGroupServiceService) { }

  ngOnInit(): void {
   
    this.username= this.storage.getUsername();
    this.employeeService.getEmploye(this.username).subscribe(data => {
      this.employeAutenticated = data;
    })
    this.employeeService.getEmployes().subscribe(
      data => {
      
        for(let c of data){
          if(this.employeAutenticated.idEmployee!=c.idEmployee){
        this.listEmployees.push(c);
          }
        }
      }
    );
  }


  ngOnDestroy(){
    this.matDialogRef.close(this.data);
  }


  closeDialog(){
    this.matDialogRef.close();
  }

  addToList(i:number){
    let employe=this.listEmployees[i];
   let newList:employee[]=[];
this.listEmployeeChossen.push(employe); 
for(let emp of this.listEmployees){
  if(emp.idEmployee!=employe.idEmployee)
  {
    newList.push(emp);
  }
}
this.listEmployees=[];
this.listEmployees=newList;


  }

removeFromList(i:number){
  let newList:employee[]=[];
  let employe=this.listEmployeeChossen[i];
this.listEmployees.push(employe);
for(let emp of this.listEmployeeChossen){
  if(emp.idEmployee!=employe.idEmployee)
  {
    newList.push(emp);
  }
}this.listEmployeeChossen=[];
this.listEmployeeChossen=newList;

}

saveGroup(name:string){
  this.nameGroupe=name;
 let  newGroupChat=new groupChat();
 newGroupChat.idGroupChat=1;
  newGroupChat.nameGroup=this.nameGroupe;
  newGroupChat.usernameCreater=this.username;
  newGroupChat.members=this.listEmployeeChossen;
  this.chatGroupService.createGroupChat(newGroupChat).subscribe();
  this.matDialogRef.close();
}



}
