import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Finanzübersicht-Frontend';


  showSidebar: boolean = true;

  constructor(private router: Router, private loginService : LoginService) {
    // Listen to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the login route
        this.showSidebar = event.url !== '/login';
      }
    });
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(){
    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean{
    return this.loginService.isLoggedIn();
  }

}
