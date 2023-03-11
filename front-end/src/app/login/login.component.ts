import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private authService: AuthService;
  private router: Router;
  public username: String = '';
  public password: String = '';

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }
  ngOnInit(): void {
  }

  onLoginClick() {
    this.authService.login(this.username, this.password).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
      } else {
        alert("Not logged in");
      }
    });
  }
}
