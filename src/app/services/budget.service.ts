import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BudgetModel} from "../model/budget.model";
import {AusgabenModel} from "../model/ausgaben.model";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private apiUrl = 'http://localhost:8888/api/budget'

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getBudgets(): Observable<BudgetModel[]> {
    return this.http.get<BudgetModel[]>(`${this.apiUrl}/alle`);
  }

  getBudgetsAktuellesMonats(): Observable<BudgetModel[]> {
    const benutzerId = this.tokenService.getSubject();
    return this.http.get<BudgetModel[]>(`${this.apiUrl}?benutzerId=${benutzerId}`);
  }

  getBudgetById(id: string): Observable<BudgetModel> {
    return this.http.get<BudgetModel>(`${this.apiUrl}/${id}`);
  }

  addBudget(budget: BudgetModel): Observable<BudgetModel> {
    return this.http.post<BudgetModel>(this.apiUrl, budget);
  }

  updateBudget(budget: BudgetModel): Observable<BudgetModel> {
    return this.http.put<BudgetModel>(`${this.apiUrl}/${budget.id}`, budget);
  }

  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addAusgabeToBudget(budgetId: string, ausgabe: AusgabenModel): Observable<BudgetModel> {
    return this.http.post<BudgetModel>(`${this.apiUrl}/${budgetId}/ausgaben`, ausgabe);
  }

  removeAusgabeFromBudget(budgetId: string, ausgabeId: string): Observable<BudgetModel> {
    return this.http.delete<BudgetModel>(`${this.apiUrl}/${budgetId}/ausgaben/${ausgabeId}`);
  }
}
