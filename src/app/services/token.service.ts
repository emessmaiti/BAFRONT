import { Injectable } from '@angular/core';
import jwt_decode, {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null = null;
  private subject: string | null = null;
  private name : string | null = null;

  constructor() {
    this.loadToken(); // Ensure the token is loaded when the service is initialized
  }

  private loadToken() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.decodeToken();
    }
  }

  private decodeToken() {
    try {
      const decodedToken: any = jwtDecode(this.token!);
      this.subject = decodedToken.sub;
      this.name = decodedToken.name;
      console.log('Decoded subject:', this.subject); // Debug log
    } catch (error) {
      console.error('Error decoding token:', error);
      this.subject = null;
    }
  }

  getToken(): string | null {
    return this.token;
  }

  getSubject(): string | null {
    return this.subject;
  }

  getFullName(): string | null{
    return this.name;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this.decodeToken();
  }

  clearToken() {
    this.token = null;
    this.subject = null;
    localStorage.removeItem('token');
  }
}
