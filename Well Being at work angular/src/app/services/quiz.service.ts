import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Quizs } from '../model/quizs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }

  addQuiz (q:Quizs,idevent:any):Observable<Quizs> {
   return this.http.post<Quizs>(`http://localhost:8085/pi-spring/Quiz/add-Quiz/${idevent}`,q);
  }
  getQuizById(id:any):Observable<Quizs>{
   return this.http.get<Quizs>(`http://localhost:8085/pi-spring/Quiz/show-Quiz/${id}`);
  }
  updateQuiz(q:Quizs):Observable<Quizs>{
    return this.http.put<Quizs>(`http://localhost:8085/pi-spring/Quiz/modify-Quiz`,q);
  }
  deleteQuiz(id:any):Observable<Quizs> {
    return this.http.delete<Quizs>(`http://localhost:8085/pi-spring/Quiz/remove-Quiz/${id}`);
  }
  getAllQuizs():Observable<Quizs[]>{
    return this.http.get<Quizs[]>(`http://localhost:8085/pi-spring/Quiz/retrieve-all-Quiz`);
   }
   getuserQuizs(id:any):Observable<Quizs[]>{
    return this.http.get<Quizs[]>(`http://localhost:8085/pi-spring/Quiz/retrieveuserquiz/${id}`);
   }
}