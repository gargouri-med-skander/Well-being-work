import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { loginRequest } from '../model/loginRequest';
import { BehaviorSubject, Observable } from 'rxjs';
import { employee } from '../model/employee';
import { jwtResponse } from '../model/jwtResponse';
import { map } from 'rxjs/operators';
import { TokenStorageService } from '../token-storage.service';
const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<employee>;
  private signInUrl: string = "http://localhost:8089/SpringMVC/auth/signin";
  private signUpUrl: string = "http://localhost:8089/SpringMVC/auth/signup";
  private logOutUrl: string = "http://localhost:8089/SpringMVC/auth/logout/";
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem(TOKEN_KEY));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  SignInEmployee(loginInfo: loginRequest) {
    return this.http.post<jwtResponse>(this.signInUrl, loginInfo)
      .pipe(map(data => {
        this.saveUserData(data);
        return data;
      }));
  }


  signUpEmployee(user: employee) {
    return this.http.post(this.signUpUrl, user, httpOption)
      .pipe(map(data => {
        //this.saveUserData(data);
        return data;
      }));
  }
  private saveUserData(data: jwtResponse) {
    this.tokenStorage.saveID(data.id);
    this.tokenStorage.saveType(data.tokenType);
    this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveUsername(data.username);
    this.tokenStorage.saveEmail(data.email);
    this.tokenStorage.saveAuthorities(data.roles);
    this.currentUserSubject.next(data.accessToken);
  }


  logOut() {
    let usernameAuthenticated = this.tokenStorage.getUsername();
    return this.http.put(this.logOutUrl + usernameAuthenticated, null);
  }


}
