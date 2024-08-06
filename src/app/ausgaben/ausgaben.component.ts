import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AusgabenService } from "../services/ausgaben.service";
import { AusgabenModel } from "../model/ausgaben.model";
import { BudgetService } from "../services/budget.service";
import { BudgetModel } from "../model/budget.model";

@Component({
  selector: 'app-ausgaben',
  templateUrl: './ausgaben.component.html',
  styleUrls: ['./ausgaben.component.css']
})
export class AusgabenComponent implements OnInit {
  ausgabeForm!: FormGroup;
  ausgabeSumme!: number;
  panelOpenState = false;
  ausgaben: AusgabenModel[] = [];
  budgets: BudgetModel[] = [];

  constructor(private fb: FormBuilder, private ausgabeService: AusgabenService, private budgetService: BudgetService) { }

  ngOnInit(): void {
    const kontoId = localStorage.getItem('kontoId');
    this.ausgabeForm = this.fb.group({
      bezeichnung: ['', Validators.required],
      betrag: ['', Validators.required],
      datum: ['', Validators.required],
      ausgabeKategorie: ['', Validators.required],
      kontoId: [kontoId, Validators.required],
      budget: [null, Validators.required],  // Changed to budget object
      beschreibung: ['']
    });

    this.ausgabeService.getAlleAusgabenDesMonats().subscribe(data => {
      this.ausgaben = data;
    });

    this.ausgabeService.getAusgabenSumme().subscribe(data => {
      this.ausgabeSumme = data;
    });

    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getBudgetsAktuellesMonats().subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  addAusgabe(): void {
    if (this.ausgabeForm.valid) {
      const newAusgabe: AusgabenModel = this.ausgabeForm.value;
      const selectedBudgetId = this.ausgabeForm.get('budget')?.value;
      const selectedBudget = this.budgets.find(budget => budget.id === selectedBudgetId);
      if (selectedBudget) {
        newAusgabe.budget = selectedBudget;
      }
      this.ausgabeService.postAusgabe(newAusgabe).subscribe((ausgabe: AusgabenModel) => {
        console.log('Received response:', ausgabe);
        this.ausgaben.push(ausgabe);
        this.ausgabeForm.reset();
        this.ausgabeForm.patchValue({ kontoId: localStorage.getItem('kontoId') });
      }, error => {
        console.error('Error response:', error);
      });
    }
  }
}
