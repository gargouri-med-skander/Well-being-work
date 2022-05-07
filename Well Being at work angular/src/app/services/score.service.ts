import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Scores } from '../model/scores';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  addScore (s:Scores,userid:any,quizid:any):Observable<Scores> {
    return this.http.post<Scores>(`http://localhost:8085/pi-spring/score/add-score/${userid}/${quizid}`,s);
   }
   modifyQuiz(s:Scores):Observable<Scores>{
    return this.http.put<Scores>(`http://localhost:8085/pi-spring/score/modify-score`,s);
   }
   showscoresss(idqz:any,iduser:any):Observable<Scores>{
     return this.http.get<Scores>(`http://localhost:8085/pi-spring/score/showuserscorequiz/${idqz}/${iduser}`);
   }
   retrieveauserscore(scoreid:any):Observable<Scores>{
    return this.http.get<Scores>(`http://localhost:8085/pi-spring/score/show-score/${scoreid}`);
  }
   removescore(idscore:any):Observable<Scores> {
     return this.http.delete<Scores>(`http://localhost:8085/pi-spring/score/remove-score/${idscore}`);
   }
   getuserscore(userid:any):Observable<Scores[]>{
     return this.http.get<Scores[]>(`http://localhost:8085/pi-spring/score/user-quiz/${userid}`);
    }
    triscoreparquiz(idquiz:any):Observable<Scores[]>{
     return this.http.get<Scores[]>(`http://localhost:8085/pi-spring/score/triscore/${idquiz}`);
    }
}