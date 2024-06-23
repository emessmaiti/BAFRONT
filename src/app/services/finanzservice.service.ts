import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FinanzdatenModel} from "../model/finanzdaten.model";

@Injectable({
  providedIn: 'root'
})
export class FinanzserviceService {

    private apiUrl = 'http://localhost:8888/api'

  constructor(private http: HttpClient) { }

  getEinnahmenSumme(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/einnahmen/getSumme?kontoId=1`)
  }

  getAusgabenSumme(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/ausgaben/getSumme?kontoId=1`)
  }
}
