import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '../model/Chat';
import { employee } from '../model/employee';
import { groupChat } from '../model/groupChat';
import { ChatGroupServiceService } from '../services/chat-group-service.service';
import { ChatServiceService } from '../services/chat-service.service';
import { EmployeesServiceService } from '../services/employees-service.service';
import { TokenStorageService } from '../token-storage.service';
import * as moment from 'moment';
@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {
  @Input()
  list: Chat[];
  @Input()
  userChatting: employee;
  @Input()
  groupChatting: groupChat;
  @Input()
  listLastMsg:Chat[];
  public idUser: string;
  userAuthenticated: employee;

  sizeList:number;
  constructor(private tokenStorag: TokenStorageService, private employeeService: EmployeesServiceService
    , private router: Router, private activatedroute: ActivatedRoute
    , private chatService: ChatServiceService
    , private groupChatService: ChatGroupServiceService) { }
   
  ngOnInit(): void {
    if (this.tokenStorag.getUsername() == null) {
      this.router.navigate(['/signIn']);
    }
    else {
      //partie setinterval
      $(document).ready(() => {
        const loadLog = () => {
          this.loadChat();

        }
        setInterval(loadLog, 1000);
      });
      //te5ou user eli authenticated
      let idUser = this.activatedroute.snapshot.paramMap.get('id');
      this.idUser = idUser;
      let username = this.tokenStorag.getUsername();
      this.employeeService.getEmploye(username).subscribe(data => {
        this.userAuthenticated = data;
      })
    }
  }
  diff_minutes(dt2:Date, dt1:Date) 
  {
 
   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= 60;
   return Math.abs(Math.round(diff));
   
  } 
   diff_hours(dt2:Date, dt1:Date) 
  {
 
   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60);
   return Math.abs(Math.round(diff));
   
  }
  handleDate(messages:Chat[]){
    if(messages.length==1){
      let momentNOW = moment(moment.now()).format('MM/DD/YYYY HH:mm:ss');
      let datemessage = moment(messages[0].date).format('MM/DD/YYYY HH:mm:ss');
      let dateNow=new Date(momentNOW);
      let dateMsg = new Date(datemessage);
      let dateOrTime=this.diff_minutes(dateMsg,dateNow);
      if(dateOrTime<1440){
        messages[0].strDateInChat=  moment(messages[0].date).format('HH:mm');
        }
        else{
          messages[0].strDateInChat=  moment(messages[0].date).format('DD/MM/YYYY HH:mm');
        }
    
    }
    else{
    for(let i=0; i<messages.length-1;i++){

      let momentNOW = moment(moment.now()).format('MM/DD/YYYY HH:mm:ss');
      let datemessagePrec = moment(messages[i].date).format('MM/DD/YYYY HH:mm:ss');
      let datemessageNext = moment(messages[i+1].date).format('MM/DD/YYYY HH:mm:ss');

      let dateNow=new Date(momentNOW);
let dateMsgPrec = new Date(datemessagePrec);
let dateMsgNext = new Date(datemessageNext);

let diffMin=this.diff_minutes(dateMsgPrec,dateMsgNext);
if(diffMin>5){
let dateOrTime=this.diff_minutes(dateMsgPrec,dateNow);
if(dateOrTime<1440){
messages[i].strDateInChat=  moment(messages[i+1].date).format('HH:mm');
}
else{
  messages[i].strDateInChat=  moment(messages[i+1].date).format('DD/MM/YYYY HH:mm');
}

}
    }
  }
  return messages ;
  }
  loadChat(){
    if (this.userChatting != null) {
      var idRecever = this.userChatting.idEmployee.toString();
      this.chatService.getChatBettweenTwoUsers(idRecever).subscribe((messages: Chat[]) => {
      
        this.list = this.handleDate(messages);
        this.sizeList=this.list.length;
      });
    }
    if (this.groupChatting != null) {
      var idGroup = this.groupChatting.idGroupChat.toString();
      this.groupChatService.getMesageGroup(idGroup).subscribe((messages:Chat[]) => {
       
        this.list = this.handleDate(messages);
      })
    }
   
  }

 
}
