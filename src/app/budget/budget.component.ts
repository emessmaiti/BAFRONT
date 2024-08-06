import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BudgetModel} from "../model/budget.model";
import {BudgetService} from "../services/budget.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit {
  budgetForm!: FormGroup;
  budgets: BudgetModel[] = [];
  benutzerId: string = '';
  errorMessage :string = '';

  constructor(private fb: FormBuilder, private budgetService: BudgetService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const kontoId = localStorage.getItem('kontoId');
    this.budgetForm = this.fb.group({
      kategorie: ['', Validators.required],
      startDatum: ['', Validators.required],
      endDatum: ['', Validators.required],
      betrag: ['', Validators.required],
      kontoId: [kontoId, Validators.required]
    });

    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getBudgetsAktuellesMonats().subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  addBudget(): void {
    if (this.budgetForm.valid) {
      const newBudget: BudgetModel = this.budgetForm.value;
      const aktuelleMonat = new Date().getMonth();
      const aktuelleJahr = new Date().getFullYear();

      const budgetsGleichenKategorie = this.budgets.filter(budget =>
        budget.kategorie === newBudget.kategorie &&
        new Date(budget.startDatum).getMonth() === aktuelleMonat &&
        new Date(budget.startDatum).getFullYear() === aktuelleJahr
      );

      if (budgetsGleichenKategorie.length > 0) {
        this.errorMessage = 'Es können nicht mehr als 2 Budgets derselben Kategorie im selben Monat erstellt werden!';
        this.showSnackbar(this.errorMessage);
      } else {
        this.budgetService.addBudget(newBudget).subscribe({
          next: (budget: BudgetModel) => {
            this.budgets.push(budget);
            this.budgetForm.reset();
            this.errorMessage = '';
          },
          error: (error) => {
            this.errorMessage = error;
            this.showSnackbar(this.errorMessage);
          }
        });
      }
    }
  }

deleteAusgabe(budgetId: string, ausgabeId: string): void {
    this.budgetService.removeAusgabeFromBudget(budgetId, ausgabeId).subscribe(() => {
      this.loadBudgets();
    });
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => {
      this.budgets = this.budgets.filter(b => b.id !== id);
    });
  }

  getProgress(budget: BudgetModel): number {
    if (!budget.betrag || budget.betrag === 0) {
      return 0;
    }
    return ((budget.betrag - budget.restBetrag) / budget.betrag) * 100;
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Schließen', {
      duration: 10000,
    });
  }

}
