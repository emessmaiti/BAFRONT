import { Component } from '@angular/core';
import {TokenService} from "../services/token.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  opened = true;

  constructor(private tokenService : TokenService, private loginService : LoginService) {
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  getFullName(): string | null{
    return this.tokenService.getFullName();
  }

  logout(){
    this.loginService.logout();
  }

}
