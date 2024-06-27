import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";

import {OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EinnahmenComponent } from './einnahmen/einnahmen.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AusgabenComponent } from './ausgaben/ausgaben.component';
import { FinanzzielComponent } from './finanzziel/finanzziel.component';
import { BudgetComponent } from './budget/budget.component';
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import { LoginComponent } from './login/login.component';
import {LoginService} from "./services/login.service";
import {AuthGuard} from "./auth.guard";
import {MatProgressBar, MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    EinnahmenComponent,
    DashboardComponent,
    AusgabenComponent,
    FinanzzielComponent,
    BudgetComponent,
    LoginComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatCardModule,
        MatExpansionModule,
        MatGridListModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatInputModule,
        OAuthModule.forRoot(),
        MatProgressBarModule
    ],
  providers: [
    LoginService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
