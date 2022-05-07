import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../model/Chat';
import { employee } from '../model/employee';
import { groupChat } from '../model/groupChat';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupServiceService {
getChatUrl:string="http://localhost:8089/SpringMVC/groupchat/showMessageGroup/";
getAGroupChatUrl:string="http://localhost:8089/SpringMVC/groupchat/getAGroup/";
sendMessageUrl:string="http://localhost:8089/SpringMVC/groupchat/sendGroup/";
createGroupUrl:string="http://localhost:8089/SpringMVC/groupchat/createGroup";
inviteMmeberUrl:string="http://localhost:8089/SpringMVC/groupchat/invite/";
showMembersUrl:string="http://localhost:8089/SpringMVC/groupchat/showMembers/";
leaveGroupUrl:string="http://localhost:8089/SpringMVC/groupchat/leave/";
kickMemberUrl:string="http://localhost:8089/SpringMVC/groupchat/kickmember/"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

getMesageGroup(idGroup:string):Observable<Chat[]>{
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  let idAuthenticated = this.tokenStorage.getId();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.get<Chat[]>(this.getChatUrl +idGroup+"/"+ idAuthenticated, { headers });
}
getAGroupChat(idGroup:string):Observable<groupChat>{
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.get<groupChat>(this.getAGroupChatUrl +idGroup, { headers });
}
sendMsgInGroup(idGroup:string,msg:string):Observable<Chat>{
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  let idAuthenticated = this.tokenStorage.getId();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.post<Chat>(this.sendMessageUrl +idGroup+"/"+ idAuthenticated+"/"+msg, msg,{ headers });
}
createGroupChat(gc:groupChat):Observable<groupChat>{
  const group ={usernameCreater:gc.employeeCreater,nameGroup:gc.nameGroup,members:gc.members};
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.post<groupChat>(this.createGroupUrl ,gc,{ headers });
}

showMembers(idGroup:string):Observable<employee[]>{
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.get<employee[]>(this.showMembersUrl +idGroup, { headers });
}

leaveGroup(idGroup:string){
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  let idAuthenticated = this.tokenStorage.getId();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.put(this.leaveGroupUrl +idGroup+"/"+ idAuthenticated, idGroup,{ headers });
}
inviteMember(idGroup:string,username:string){
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.put(this.inviteMmeberUrl +idGroup+"/"+ username, idGroup,{ headers });
}

kickMember(idGroup:string,username:string){
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.put(this.kickMemberUrl +idGroup+"/"+ username, idGroup,{ headers });
}
}
