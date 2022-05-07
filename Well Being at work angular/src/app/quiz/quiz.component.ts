import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quizs } from '../model/quizs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  Quiz: Quizs;
name:number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.name=this.data
  }
next(){
  window.location.reload();
}
}