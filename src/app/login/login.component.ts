import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../services/token.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private tokenService: TokenService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['access_token'];
      const kontoId = params['kontoId'];
      if (token) {
        console.log('Token found:', token);  // Debug log
        this.tokenService.setToken(token);
        if (kontoId) {
          localStorage.setItem('kontoId', kontoId);
          this.router.navigate(['/dashboard']);
        } else {
          console.error('No kontoId found in URL');
          // Optionally show an error message or handle this case
        }
      } else {
        console.log('No token found in URL');  // Debug log
        // Optionally show an error message or handle this case
      }
    });
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:8085/oauth2/authorization/google';
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
}
