import {Component, OnInit} from '@angular/core';
import {Transaktionsservice} from "../services/transaktionsservice.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EinnahmenModel} from "../model/einnahmen.model";
import {ZieleModel} from "../model/ziele.model";
import {EinnahmenService} from "../services/einnahmen.service";
import {ZieleService} from "../services/ziele.service";

@Component({
  selector: 'app-finanzziel',
  templateUrl: './finanzziel.component.html',
  styleUrl: './finanzziel.component.css'
})
export class FinanzzielComponent implements OnInit{
  panelOpenState!: boolean;
  zielForm! : FormGroup;
  ziele: ZieleModel[] = [];

  constructor(private fb: FormBuilder, private zielService: ZieleService) {

  }

  ngOnInit(): void {
    this.zielForm = this.fb.group({
      titel: ['', Validators.required],
      betrag: ['', Validators.required],
      monatSparbetrag: ['', Validators.required],
      datum: ['', Validators.required],
      einnahmeType: ['',],
      beschreibung: ['']
    });
  }
    addZiel(): void {
      if (this.zielForm.valid) {
        const newZiel: ZieleModel = this.zielForm.value;
        this.zielService.postZiel(newZiel).subscribe((ziel: ZieleModel) => {
          this.ziele.push(ziel);
          this.zielForm.reset();
        });
      }
    }


}
