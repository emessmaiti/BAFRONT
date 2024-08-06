import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EinnahmenModel} from "../model/einnahmen.model";
import {TransaktionenModel} from "../model/transaktionen.model";
import {AusgabenModel} from "../model/ausgaben.model";

@Injectable({
  providedIn: 'root'
})
export class EinnahmenService {

  private apiUrl = 'http://localhost:8888/api'


  constructor(private http : HttpClient) { }

  getEinnahmenSumme(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/einnahmen/getSumme`)
  }

  getAlleAusgabenDesMonats(): Observable<EinnahmenModel[]>{
    return this.http.get<EinnahmenModel[]>(`${this.apiUrl}/einnahmen/all`)
  }

  postEinnahme(einnahme : EinnahmenModel): Observable<EinnahmenModel>{
    return this.http.post<EinnahmenModel>(`${this.apiUrl}/einnahmen`, einnahme)
  }
}
