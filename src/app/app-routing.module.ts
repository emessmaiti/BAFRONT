import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EinnahmenComponent } from './einnahmen/einnahmen.component';
import {AusgabenComponent} from "./ausgaben/ausgaben.component";
import {FinanzzielComponent} from "./finanzziel/finanzziel.component";
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'einnahmen', component: EinnahmenComponent, canActivate: [AuthGuard] },
  { path: 'ausgaben', component: AusgabenComponent, canActivate: [AuthGuard] },
  { path: 'ziel', component: FinanzzielComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
