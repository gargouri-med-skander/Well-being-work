import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { Observable } from 'rxjs';
import { Chat } from '../model/Chat';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  getAllMessage: string = "http://localhost:8089/SpringMVC/chat/showLastMessages/";
  getChatBetweenTwoUsers: string = "http://localhost:8089/SpringMVC/chat/show/";
  sendMsgUrl: string = "http://localhost:8089/SpringMVC/chat/send/"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAllLastMessage(): Observable<Chat[]> {
    let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
    let idAuthenticated = this.tokenStorage.getId();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Chat[]>(this.getAllMessage + idAuthenticated, { headers });
  }

  getChatBettweenTwoUsers(idselectedUser: string): Observable<Chat[]> {
    let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
    let idAuthenticated = this.tokenStorage.getId();
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Chat[]>(this.getChatBetweenTwoUsers + idAuthenticated + "/" + idselectedUser, { headers });
  }

  sendMessage(contenu: string, idRecever: string): Observable<Chat> {
    let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
    let idAuthenticated = this.tokenStorage.getId();
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post<Chat>(this.sendMsgUrl + idAuthenticated + "/" + idRecever + "/" + contenu, contenu, { headers });
  }
}
