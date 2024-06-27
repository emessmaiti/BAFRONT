import {BudgetModel} from "./budget.model";

export interface AusgabenModel{
  bezeichnung : string;
  betrag : number;
  datum : string;
  einnahmeType : string;
  beschreibung : string;
  budget : BudgetModel;
}
