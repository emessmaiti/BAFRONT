import {AusgabenModel} from "./ausgaben.model";

export interface BudgetModel {
  id: number;
  kategorie: string;
  startDatum: Date;
  endDatum: Date;
  betrag: number;
  restBetrag: number;
  ausgaben: AusgabenModel[];
}
