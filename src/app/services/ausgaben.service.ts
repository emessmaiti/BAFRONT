import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AusgabenModel} from "../model/ausgaben.model";

@Injectable({
  providedIn: 'root'
})
export class AusgabenService {

  private apiUrl = 'http://localhost:8888/api'

  constructor(private http : HttpClient) { }

  getAusgabenSumme(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/ausgaben/getSumme`)
  }

  getAlleAusgabenDesMonats(): Observable<AusgabenModel[]>{
    return this.http.get<AusgabenModel[]>(`${this.apiUrl}/ausgaben/all`)
  }

  postAusgabe(ausgabe : AusgabenModel): Observable<AusgabenModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AusgabenModel>(`${this.apiUrl}/ausgaben`, ausgabe, { headers });
  }
}
