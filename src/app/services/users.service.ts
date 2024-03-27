import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsers } from "../interfaces/i-users";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public usersUrl: string = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // Method to register a new user
  createUser(user: IUsers): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/register`, user);
  }

  // Method to login a user
  loginUser(user: { name: string; password: string; _id: any }): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/authenticate`, user);
  }

  // Method to get user by ID (assuming a getUser endpoint exists)
  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${id}`);
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}`);
  }
  // Method to logout user (assuming a logout endpoint exists)
  logout(): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/logout`, {});
  }
}
