import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLoggedIn: boolean = false;

  constructor() { }

  public isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  public login(username: String, password: String): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      this.isUserLoggedIn = true;
    }
    return of(this.isUserLoggedIn);
  }
}
