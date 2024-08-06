import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransaktionenModel} from "../model/transaktionen.model";
import {TokenService} from "./token.service";
import {KontoserviceService} from "./kontoservice.service";

@Injectable({
  providedIn: 'root'
})
export class Transaktionsservice {

  private apiUrl = 'http://localhost:8888/api';

  constructor(private http : HttpClient, private kontoService: KontoserviceService) { }

  getTransDesMonats(): Observable<TransaktionenModel[]>{
    let kontoId = this.kontoService.getKontoId();
    return this.http.get<TransaktionenModel[]>(`${this.apiUrl}/transaktionen/${kontoId}`)
  }

}
