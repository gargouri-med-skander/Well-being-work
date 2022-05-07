import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { SignUPComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatDialogModule}from '@angular/material/dialog';
import { SettingComponent } from './setting/setting.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { RestePasswordComponent } from './reste-password/reste-password.component';
import { AddquizComponent } from './addquiz/addquiz.component';
import { ListquizComponent } from './listquiz/listquiz.component';
import { QuizComponent } from './quiz/quiz.component'




@NgModule({
  declarations: [
    AppComponent,
    SignUPComponent,
    SignInComponent,
    HomeComponent,
    InboxComponent,
    MessagerieComponent,
    SettingComponent,
    AddGroupComponent,
    SendEmailComponent,
    RestePasswordComponent,
    AddquizComponent,
    ListquizComponent,
    QuizComponent,
    
   
  ],
  entryComponents:[
    SettingComponent,
    AddGroupComponent,
    SendEmailComponent,
    RestePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
