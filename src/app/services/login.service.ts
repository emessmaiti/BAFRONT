  import { Injectable } from '@angular/core';
  import {Router} from "@angular/router";
  import {HttpClient} from "@angular/common/http";
  import {TokenService} from "./token.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router,
              private http:HttpClient,
              private tokenService : TokenService) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.http.post('http://localhost:8085/logout', {}).subscribe(() => {
      this.tokenService.clearToken();
      localStorage.removeItem('kontoId');
      this.router.navigate(['/login']);
    }, error => {
      console.error('Logout failed', error);
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
