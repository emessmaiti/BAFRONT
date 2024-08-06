import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router, RouterStateSnapshot,
} from '@angular/router';
import {Injectable} from "@angular/core";
import {LoginService} from "./services/login.service";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): boolean {
    const token = this.loginService.getToken();
    const kontoId = localStorage.getItem('kontoId');

    if (token && kontoId) {
      return true;
    } else {
      console.error('Authentication required or kontoId missing');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
