import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from '../model/employee';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesServiceService {
  getAllEmployeUrl: string = "http://localhost:8089/SpringMVC/employee/showAll";
  getEmployeeAuthnticated = "http://localhost:8089/SpringMVC/employee/getEmployee/";
  getEmployeeById = "http://localhost:8089/SpringMVC/employee/getEmployeeById/";

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getEmployes(): Observable<employee[]> {
    let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<employee[]>(this.getAllEmployeUrl, { headers });
  }

  getEmploye(username: string): Observable<employee> {
    let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<employee>(this.getEmployeeAuthnticated + username, { headers });
  }
  getEmployeById(id: string): Observable<employee> {
    let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<employee>(this.getEmployeeById + id, { headers });
  }
//partie modification des information 
saveFirstNameUrl:string="http://localhost:8089/SpringMVC/employee/changeFristName/";
saveLastNameUrl:string="http://localhost:8089/SpringMVC/employee/changeLastName/";
saveUsernameUrl:string="http://localhost:8089/SpringMVC/employee/changeUsername/";
saveEmailUrl:string="http://localhost:8089/SpringMVC/employee/changeEmail/";
savePasswordUrl:string="http://localhost:8089/SpringMVC/employee/changePassword/";
saveDateUrl:string="http://localhost:8089/SpringMVC/employee/changeDateOfBirth/";
savePictureUrl:string="http://localhost:8089/SpringMVC/employee/changeProfil/";
saveFirstName(x:string){
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  let id = this.tokenStorage.getId();
  return this.http.put(this.saveFirstNameUrl + id+"/"+x,x, { headers });
}
saveLastName(x:string){
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  let id = this.tokenStorage.getId();
  return this.http.put(this.saveLastNameUrl + id+"/"+x, x,{ headers });
}
saveUsername(x:string):Observable<string>{
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  let id = this.tokenStorage.getId();
  return this.http.put<string>(this.saveUsernameUrl + id+"/"+x, x,{ headers });
}
saveEmail(x:string){
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  let id = this.tokenStorage.getId();
  return this.http.put(this.saveEmailUrl + id+"/"+x, x,{ headers });
}
savePassword(x:string){
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  let id = this.tokenStorage.getId();
  return this.http.put(this.savePasswordUrl + id+"/"+x, x,{ headers });
}
saveDate(date:string){
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  let id = this.tokenStorage.getId();
  return this.http.put(this.saveDateUrl + id+"/"+date, date,{ headers });
}
savePicture(){
  
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  
  let id = this.tokenStorage.getId();
  return this.http.post<FormData>(this.savePictureUrl + id, { headers  ,
    reportProgress:true,
    observe:'events'});
}
//verification password
verifPassUrl:string="http://localhost:8089/SpringMVC/employee/verifPassword/";
verifPass(pass:string):Observable<boolean>{
  let tokenStr = 'Bearer ' + this.tokenStorage.getToken();
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  let id = this.tokenStorage.getId();
  return this.http.get<boolean>(this.verifPassUrl +id+"/"+pass, { headers,observe:'body'});
}
sendEmailUrl:string="http://localhost:8089/SpringMVC/auth/sendEmail/";
sendEmail(email:string):Observable<boolean>{

  return this.http.post<boolean>(this.sendEmailUrl +email, email);
}
restePasswordUrl:string="http://localhost:8089/SpringMVC/auth/restePass/";
restePass(email:string,code:string,newPass:string):Observable<boolean>{
 

  return this.http.post<boolean>(this.restePasswordUrl +email+"/"+code+"/"+newPass, email);
}
}

