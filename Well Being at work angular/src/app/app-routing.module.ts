import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { QuizComponent } from './quiz/quiz.component';
import { RestePasswordComponent } from './reste-password/reste-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUPComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path:"signIn",component:SignInComponent,data:{title : 'sign in ' }},
  {path:"signUp",component:SignUPComponent,data:{title : 'sign up' }},
  {path:"inBox",component:InboxComponent,data:{title : 'inbox' }},
  {path:"inBox/:id",component:MessagerieComponent,data:{title : 'chats' }},
  {path:"restePassword",component:RestePasswordComponent},
  {path:"",component:HomeComponent,data:{title : 'Home' }},

  {path: '**', component: HomeComponent},
  {path:"listquiz",component:QuizComponent,data:{title : 'listquiz' }},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
