import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EinnahmenComponent } from './einnahmen/einnahmen.component';
import {AusgabenComponent} from "./ausgaben/ausgaben.component";
import {FinanzzielComponent} from "./finanzziel/finanzziel.component";
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";
import {AuthCallbackComponent} from "./login/auth-callback.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'einnahmen', component: EinnahmenComponent },
  { path: 'ausgaben', component: AusgabenComponent },
  { path: 'ziel', component: FinanzzielComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
