import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import { loginRequest } from '../model/loginRequest';
import { BehaviorSubject, Observable } from 'rxjs';
import { employee } from '../model/employee';
import { jwtResponse } from '../model/jwtResponse';
import { map } from 'rxjs/operators';
import { TokenStorageService } from '../token-storage.service';
const httpOption ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
const TOKEN_KEY ='AuthToken';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private currentUserSubject:BehaviorSubject<any>;
  public currentUser:Observable<employee>;
    private signInUrl:string="http://localhost:8089/SpringMVC/auth/signin";
   private signUpUrl:string="http://localhost:8089/SpringMVC/auth/signup";
  constructor(private http:HttpClient,private tokenStorage:TokenStorageService) {
    this.currentUserSubject=new BehaviorSubject<any>(sessionStorage.getItem(TOKEN_KEY));
    this.currentUser=this.currentUserSubject.asObservable();
   }

   public get currentUserValue():any{
     return this.currentUserSubject.value;
   }


  SignInEmployee(loginInfo:loginRequest){
   
    return this.http.post<jwtResponse>(this.signInUrl,loginInfo,httpOption)
    .pipe(map(data =>{
      this.saveUserData(data);
      return data;
    }));
      }


  signUpEmployee(user:employee){
    return this.http.post<jwtResponse>(this.signUpUrl,user,httpOption)
    .pipe(map (data =>{
      this.saveUserData(data);
      return data;
    }));
      }
      private saveUserData(data:any){
        this.tokenStorage.saveToken(data.acessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.currentUserSubject.next(data.acessToken);
      }


      logOut(){
        sessionStorage.removeItem(TOKEN_KEY);
      }
}
