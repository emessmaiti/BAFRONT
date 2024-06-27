import { Component, OnInit } from '@angular/core';
import { Transaktionsservice } from "../services/transaktionsservice.service";
import { KontoserviceService } from "../services/kontoservice.service";
import { EinnahmenService } from "../services/einnahmen.service";
import { AusgabenService } from "../services/ausgaben.service";
import { BudgetService } from '../services/budget.service';
import { BudgetModel } from '../model/budget.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  aktivitaeten: any[] = [];
  kontostand: number = 0;
  einnahmenSumme: number = 0;
  ausgabenSumme: number = 0;
  budgets: BudgetModel[] = [];
  panelOpenState = false;
  benutzerId: string = '';


  constructor(
    private transaktionsservice: Transaktionsservice,
    private kontoService: KontoserviceService,
    private einnahmenService: EinnahmenService,
    private ausgabenService: AusgabenService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.benutzerId = localStorage.getItem('benutzerId') || '';
    this.kontoService.getKontoStand().subscribe(data => {
      this.kontostand = data;
    });

    this.einnahmenService.getEinnahmenSumme().subscribe(data => {
      this.einnahmenSumme = data;
    });

    this.ausgabenService.getAusgabenSumme().subscribe(data => {
      this.ausgabenSumme = data;
    });

    this.transaktionsservice.getTransDesMonats().subscribe(data => {
      this.aktivitaeten = data;
    });

    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getBudgetsAktuellesMonats().subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  getProgress(budget: BudgetModel): number {
    if (!budget.betrag || budget.betrag === 0) {
      return 0;
    }
    return ((budget.betrag - budget.restBetrag) / budget.betrag) * 100;
  }

}
