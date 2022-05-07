import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Quizs } from '../model/quizs';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-listquiz',
  templateUrl: './listquiz.component.html',
  styleUrls: ['./listquiz.component.css']
})
export class ListquizComponent implements OnInit {
  listQuiz: Quizs[];
  constructor(private quizservices: QuizService, private matDialog: MatDialog) { }

  ngOnInit(): void {

this.quizservices.getAllQuizs().subscribe(
  (data: Quizs[] )=> this.listQuiz=data);
  }
  onOpenDialogClick(quizid:number){
    this.matDialog.open(QuizComponent,
      {data:quizid});
      }


      addQuizz(){


        
      }
}