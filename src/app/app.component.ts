import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Finanzübersicht-Frontend';

}
