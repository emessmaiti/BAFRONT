import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {KontoModel} from "../model/konto.model";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class KontoserviceService {

  private apiUrl = 'http://localhost:8888/api/konto'
  private id = '';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getKontoStand(): Observable<number> {
    const id = this.tokenService.getSubject();
    console.log(id);
    if (!id) {
      console.error('No user ID found');
      return throwError('No user ID found');
    }
    return this.http.get<number>(`${this.apiUrl}/kontostand/benutzer/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching KontoStand:', error);
        return throwError(error);
      })
    );
  }

  getKontoId(): string | null {
    return localStorage.getItem('kontoId');
  }

  setKontoId(kontoId: string): void {
    localStorage.setItem('kontoId', kontoId);
  }

  clearKontoId(): void {
    localStorage.removeItem('kontoId');
  }
}
