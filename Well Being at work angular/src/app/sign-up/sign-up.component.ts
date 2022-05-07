import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from '../model/employee';
import { AuthentificationService } from '../services/authentification.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUPComponent implements OnInit {

  user = new employee();
  constructor(private authService: AuthentificationService, private router: Router) { }
  signUpFailed = false;
  errorMessage = "";
  ngOnInit(): void {
  }

  saveuser(userSaved: employee) {
    this.user = userSaved;
    this.user.active = false;

    this.authService.signUpEmployee(this.user).subscribe(data => {
      this.signUpFailed = false;
      this.router.navigate(['/signIn']);

    }, error => {
      this.errorMessage = error.error.message;
      alert(this.errorMessage);
      this.signUpFailed = true;
    }
    )

  }
}
