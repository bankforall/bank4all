import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'front-end';
  public isShowDemo = false;
  public isDebugRoute = false;
  private authService: AuthService;
  private router: Router;


  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
    this.isShowDemo = this.authService.isLoggedIn();
    if (this.authService.isLoggedIn()) {
      this.title = "Dashboard";
      this.router.navigate(['/dashboard']);
    } else {
      console.log("Not logged in");
      this.title = "Login";
      this.router.navigate(['/login']);
    }
  }

}
