import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {KontoModel} from "../model/konto.model";

@Injectable({
  providedIn: 'root'
})
export class KontoserviceService {

  private apiUrl = 'http://localhost:8888'

  constructor(private http: HttpClient) { }

  getKontoStand(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/api/konto/kontostand?kontoId=1`)
  }


}
