import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private booksUrl:string="http://localhost:3000/api";
  
    constructor(private http: HttpClient) {}
  
    
    authenticate(token: string): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  
      return this.http.post(`${this.booksUrl}/auth`, {}, { headers });
    }
  }