import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ZieleModel} from "../model/ziele.model";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ZieleService {

  private apiUrl = 'http://localhost:8888/api'

  constructor(private http: HttpClient, private tokenService : TokenService) { }

  postZiel(ziel: ZieleModel): Observable<ZieleModel>{
    return this.http.post<ZieleModel>(`${this.apiUrl}/ziel`, ziel);
  }

  getAllZiel(): Observable<ZieleModel[]>{
    const id = this.tokenService.getSubject();
    if (!id) {
      throw new Error('No user ID found');
    }
    return this.http.get<ZieleModel[]>(`${this.apiUrl}/ziel/all/konto/${id}`);
  }

}
