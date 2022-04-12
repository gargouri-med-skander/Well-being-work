import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUPComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:"",component:SignInComponent,data:{title : 'sign in ' }},
  {path:"signUp",component:SignUPComponent,data:{title : 'sign up' }},
  {path:"Home",component:HomeComponent,data:{title : 'Home' }}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
