import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EinnahmenService } from '../services/einnahmen.service';
import {EinnahmenModel} from "../model/einnahmen.model";

@Component({
  selector: 'app-einnahmen',
  templateUrl: './einnahmen.component.html',
  styleUrls: ['./einnahmen.component.css']
})
export class EinnahmenComponent implements OnInit {

  einnahmeForm! : FormGroup;
  einnahmen: EinnahmenModel[] = [];
  einnahmenSumme! : number;
  panelOpenState = false;


  constructor(private fb: FormBuilder, private einnahmeService: EinnahmenService) {

  }

  ngOnInit(): void {
    const kontoId = localStorage.getItem('kontoId');
    this.einnahmeForm = this.fb.group({
      bezeichnung: ['', Validators.required],
      betrag: ['', Validators.required],
      datum: ['', Validators.required],
      einnahmeKategorie: ['', ],
      kontoId: [kontoId,Validators.required],
      beschreibung: ['']
    });

    this.einnahmeService.getAlleAusgabenDesMonats().subscribe(data => {
      this.einnahmen = data
    });

    this.einnahmeService.getEinnahmenSumme().subscribe(data => {
      this.einnahmenSumme = data
    });
  }

  addEinnahme(): void {
    if (this.einnahmeForm.valid) {
      const newEinnahme: EinnahmenModel = this.einnahmeForm.value;
      this.einnahmeService.postEinnahme(newEinnahme).subscribe((einnahme: EinnahmenModel) => {
        this.einnahmen.push(einnahme);
        this.einnahmeForm.reset();
        this.einnahmeForm.patchValue({ kontoId: localStorage.getItem('kontoId') });
      });
    }
  }
}
