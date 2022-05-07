import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddGroupComponent } from '../add-group/add-group.component';
import { Chat } from '../model/Chat';
import { employee } from '../model/employee';
import { groupChat } from '../model/groupChat';
import { ChatGroupServiceService } from '../services/chat-group-service.service';
import { ChatServiceService } from '../services/chat-service.service';
import { EmployeesServiceService } from '../services/employees-service.service';
import { TokenStorageService } from '../token-storage.service';
import * as moment from 'moment';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  listEmployees: employee[] = [];
  listAllLastMessage: Chat[] = [];
  listMessage: Chat[] = [];
  userAuthenticated: employee;
  userChattingWith: employee;
  groupChattingIn: groupChat;
  sizeListMessage: number;
  contenuMsg: string;
  idDiv: string;
  constructor(private chatService: ChatServiceService, private tokenStorag: TokenStorageService
    , private router: Router, private employeeService: EmployeesServiceService
    , private groupChatService: ChatGroupServiceService
    , private matDialog: MatDialog) { }
  ngOnInit(): void {
    if (this.tokenStorag.getUsername() == null) {
      this.router.navigate(['/signIn']);
    }
    else {
      //partie setinterval
      $(document).ready(() => {
        const loadLog = () => {
          //get last

          this.getAllLast();
          //tofa get last
        }
        setInterval(loadLog, 1000);
      });
      //tofa lena setinterval
      //partie search
      $(document).ready(() => {
        $("#searchID").keyup(() => {
          var emp = this.userAuthenticated;
          var tab = this.listAllLastMessage;
          var value = $("#searchID").val();
          var search = $("#resultatSearch");
          $("#resultatSearch").empty();
          $("#oldAffich").hide();
          if (value != "") {
            for (let x of tab) {
              var ff = value.toString();
              if (x.groupchat != null) {
                if (x.groupchat.nameGroup.toLowerCase().startsWith(ff, 0)) {
                  var element_search = $("#" + x.idChat);
                  element_search.clone().appendTo(search);
                }
              }
              else {
                if (x.employeeRecever.idEmployee != emp.idEmployee) {
                  if (x.employeeRecever.username.toLowerCase().startsWith(ff, 0)) {
                    var element_search = $("#" + x.idChat);
                    element_search.clone().appendTo(search);
                  }
                }
                if (x.employeeSender.idEmployee != emp.idEmployee) {
                  if (x.employeeSender.username.toLowerCase().startsWith(ff, 0)) {
                    var element_search = $("#" + x.idChat);
                    element_search.clone().appendTo(search);
                  }
                }
                if (x.employeeSender.idEmployee == x.employeeRecever.idEmployee) {
                  if (x.employeeSender.username.toLowerCase().startsWith(ff, 0)) {
                    var element_search = $("#" + x.idChat);
                    element_search.clone().appendTo(search);
                  }
                }
              }
            }
          }
          else {
            $('#oldAffich').show();
            $('#resultatSearch').empty();
            $('#resultatSearch').fadeIn('fast');
          }
        });
      });
      //partie search tofa lena 
      this.getAllLast();
      this.showMemeberList = [];
      this.employeeService.getEmployes().subscribe(
        employees => {
          this.listEmployees = employees;
          if (employees != null) {
            this.sizeOfTeableEmployess = this.listEmployees.length;
          }
        }
      );
      let username = this.tokenStorag.getUsername();
      this.employeeService.getEmploye(username).subscribe(data => {
        this.userAuthenticated = data;
      })
    }
  }
  handleDate(messages:Chat[]){
    if(messages.length==1){
      messages[0].strDateInChat= moment(messages[0].date).format('DD/MM/YYYY HH:mm');
    }
    else{
      messages[0].strDateInChat= moment(messages[0].date).format('DD/MM/YYYY HH:mm');
    for(let i=1; i<messages.length-1;i++){

      let momentNOW = moment(moment.now()).format('MM/DD/YYYY HH:mm:ss');
      let datemessagePrec = moment(messages[i].date).format('MM/DD/YYYY HH:mm:ss');
      let datemessageNext = moment(messages[i+1].date).format('MM/DD/YYYY HH:mm:ss');

      let dateNow=new Date(momentNOW);
let dateMsgPrec = new Date(datemessagePrec);
let dateMsgNext = new Date(datemessageNext);

let diffMin=this.diff_minutes(dateMsgPrec,dateMsgNext);
if(diffMin>6){
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
  showMessage(i: number) {
    let idString;
    let chatSelected = this.listAllLastMessage[i];
    this.showMemeberList = [];
    this.listInvite = [];
    //if mt3 est ce que groupe de chat selectionet wale
    if (chatSelected.groupchat == null) {
      if (chatSelected.employeeRecever.idEmployee != this.userAuthenticated.idEmployee) {
        idString = chatSelected.employeeRecever.idEmployee.toString();
      }
      else {
        if (chatSelected.employeeSender.idEmployee != this.userAuthenticated.idEmployee) {
          idString = chatSelected.employeeSender.idEmployee.toString();
        }
        else {
          idString = this.userAuthenticated.idEmployee.toString();
        }
      }

      this.employeeService.getEmployeById(idString).subscribe(employee => {
        this.userChattingWith = employee;
        this.groupChattingIn = null;
      })
      this.listMessage = [];
      this.chatService.getChatBettweenTwoUsers(idString).subscribe(messages => {
        
        this.listMessage = this.handleDate(messages);
        this.sizeListMessage = this.listMessage.length;
      })
      //  this.router.navigate(['/inBox',idString]);
    }
    //boucle else mt3 if est ce que groupe de chat wale
    else {

      this.userChattingWith = null;
      this.listMessage = [];
      let idGroup;
      idGroup = chatSelected.groupchat.idGroupChat.toString();
      this.groupChatService.getAGroupChat(idGroup).subscribe(groupData => {
        this.groupChattingIn = groupData;
      })
      this.groupChatService.getMesageGroup(idGroup).subscribe(messageGroup => {
        this.listMessage = this.handleDate(messageGroup);
        this.sizeListMessage = this.listMessage.length;
      })
    }
    this.getAllLast();
    this.sizeListMessage = this.listMessage.length;
  }
  sizeOfTeableEmployess: number;
  indexx: number = 0;
  next() {
    if (this.indexx + 1 <= this.sizeOfTeableEmployess - 1) {
      this.indexx++;
    }
  }
  previous() {
    if (!(this.indexx - 1 == -1)) {
      this.indexx--;
    }
  }
  showMessageFromList(numList: number) {
    this.showMemeberList = [];
    this.listMessage = [];
    let elindex;
    if (numList == 0) { elindex = 0; }
    if (numList == 1) { elindex = this.indexx }
    if (numList == 2) { elindex = this.indexx + 1; }
    let idString;
    idString = this.listEmployees[elindex].idEmployee.toString();
    // this.router.navigate(['/inBox',idString]);
    this.employeeService.getEmployeById(idString).subscribe(employee => {
      this.userChattingWith = employee;
      this.groupChattingIn = null;
    })
    this.chatService.getChatBettweenTwoUsers(idString).subscribe(messages => {
   
      this.listMessage = this.handleDate(messages);
      this.sizeListMessage = this.listMessage.length;
    })
    this.getAllLast();
  }
  sizeTableChange: boolean = false;
  public newMsg: Chat;
  errorMessage: string = "";
  sendMsg(msg: string, form: NgForm): Chat {
    if (this.userChattingWith != null) {
      this.contenuMsg = msg;
      let userRecever = this.userChattingWith;
      let idString = userRecever.idEmployee.toString();
      this.chatService.sendMessage(this.contenuMsg, idString).subscribe(chatData => {
        this.listMessage.push(chatData);
        this.contenuMsg = '';
        this.newMsg = chatData;
        return chatData
      });
      this.getAllLast();
    }
    else {
      this.contenuMsg = msg;
      let group = this.groupChattingIn;
      let idGroup = group.idGroupChat.toString();
      this.groupChatService.sendMsgInGroup(idGroup, this.contenuMsg).subscribe(chatGroupData => {
        this.listMessage.push(chatGroupData);
        this.getAllLast();
        this.contenuMsg = '';
        this.newMsg = chatGroupData;
        return chatGroupData
      });
    }
    this.sizeTableChange = true,
      this.sizeListMessage = this.listMessage.length;
    this.getAllLast();
    return null;
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
  getAllLast() {
    this.chatService.getAllLastMessage().subscribe(data => {
     
      for (let c of data) {
        //date
        
        let momentNOW = moment(moment.now()).format('MM/DD/YYYY HH:mm:ss');
        let datemessage = moment(c.date).format('MM/DD/YYYY HH:mm:ss');
       // let test = momentNOW.localeCompare(datemessage);
        let dateNow=new Date(momentNOW);
        let dateMsg = new Date(datemessage);
        let diffMin=this.diff_minutes(dateNow,dateMsg);
        if(diffMin==0){
          c.strDate = 'just now';
        }
        else{
          if(diffMin<60){
          c.strDate = diffMin.toString() + 'minute ago';
          }
          else{
            let DiffHour = this. diff_hours(dateNow, dateMsg) ;
            if(DiffHour<24){
              c.strDate = DiffHour.toString() + 'hour ago';
            }
            else{
              let diffDays=DiffHour/24;
              
              diffDays=~~diffDays;
              
              if(diffDays<30){
                c.strDate = diffDays.toString() + 'day ago';
              }
              else{
                let diffMonth=diffDays/30;
                diffMonth=~~diffMonth;
                if(diffMonth<12){
                  c.strDate = diffMonth.toString() + 'month ago';
                }
                else{
                 let diffYear=diffMonth/12;
                 diffYear=~~diffYear;
                 c.strDate = diffYear.toString() + 'year ago';
                }
              }

            }
          }
        }
        //if kbira
        if (c.groupchat == null) {
          if (!(c.content.length <= 17)) {
            c.content = c.content.slice(0, 17) + "...";
          }
          if (c.employeeRecever.idEmployee != this.userAuthenticated.idEmployee) {
            let test = "vous:" + c.content
            if (!(test.length <= 17)) {
              c.content = c.content.slice(0, 9) + "...";
            }
            this.listAllLastMessage = data;
          }
          else {
            this.listAllLastMessage = data;
          }
        }
        //else mt3 if kbira
        else {
          if (c.employeeSender != null && c.employeeSender.idEmployee == this.userAuthenticated.idEmployee) {
            let test = "you: " + c.content
            if (!(test.length <= 17)) {
              c.content = test.slice(0, 15) + "...";
            }
            else {
              c.content = test;
            }
            this.listAllLastMessage = data;
          }
          if (c.employeeSender != null && c.employeeSender.idEmployee != this.userAuthenticated.idEmployee) {
            let test = c.employeeSender.username + ": " + c.content;
            if (!(test.length <= 17)) {
              c.content = test.slice(0, 17) + "...";
            }
            else {
              c.content = test;
            }
            this.listAllLastMessage = data;
          }
          if (c.employeeSender == null) {
            if (!(c.content.length <= 17)) {
              c.content = c.content.slice(0, 17) + "...";
            }
            this.listAllLastMessage = data;
          }
        }
      }
    })
    this.sizeListMessage = this.listMessage.length;
  }
  //addGroup
  openAddGroup() {
    this.matDialog.open(AddGroupComponent, {
      data: this.listEmployees,
      width: "600px"
    });
  }
  listInvite: employee[] = [];
  inviteMember() {
    this.listInvite = [];
    $("#hide2").show();
    $("#idHidden").hide();
    $("#idLeft").hide();
    for (let inv of this.listEmployees) {
      let exist: boolean = false;
      for (let m of this.showMemeberList) {
        if (inv.idEmployee == m.idEmployee) {
          exist = true;
        }
      }
      if (!exist) {
        this.listInvite.push(inv);
        exist = false;
      }
    }
  }
  inviteMemberFromList(i: number) {
    let test = this.listInvite;
    let username = this.listInvite[i].username;
    let id = this.listInvite[i].idEmployee;
    this.listInvite = [];
    let idString = this.groupChattingIn.idGroupChat.toString();
    this.groupChatService.inviteMember(idString, username).subscribe();
    for (let c of test) {
      if (c.idEmployee != id) {
        this.listInvite.push(c);
      }
    }
  }
  showMemeberList: employee[] = [];
  showMembers() {
    $("#idHidden").show();
    $("#idLeft").hide();
    $("#hide2").hide();
    this.listInvite = [];
    let idString = this.groupChattingIn.idGroupChat.toString();
    this.groupChatService.showMembers(idString).subscribe(list => {

      this.showMemeberList = list;

    })
  }
  
  showMenu() {
    this.listInvite = [];
    $("#idLeft").show();
    $("#hide2").hide();
    $("#idHidden").hide();
  }
  leaveGroup() {
    this.listInvite = [];
    let idString = this.groupChattingIn.idGroupChat.toString();
    this.groupChatService.leaveGroup(idString).subscribe();
    window.location.reload();

  }
  kickMember(p: number) {
    let test = this.showMemeberList;
    let username = this.showMemeberList[p].username;
    let id = this.showMemeberList[p].idEmployee;
    this.showMemeberList = [];
    let idString = this.groupChattingIn.idGroupChat.toString();
    this.groupChatService.kickMember(idString, username).subscribe();
    for (let c of test) {
      if (c.idEmployee != id) {
        this.showMemeberList.push(c);
      }
    }
  }
}
