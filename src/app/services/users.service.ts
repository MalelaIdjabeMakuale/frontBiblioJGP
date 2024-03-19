import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsers } from '../interfaces/i-users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllUsers(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(this.usersUrl)
        .subscribe(
          (response) => resolve(response),
          (error) => {
            console.error('Error en la petición getAllUsers:', error);
            reject(error);
          }
        );
    });
  }

  getUserId(id: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(`${this.usersUrl}/${id}`)
        .subscribe(
          (response) => resolve(response),
          (error) => {
            console.error('Error en la petición getUserId:', error);
            reject(error);
          }
        );
    });
  }

  loginUser(user: IUsers): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${this.usersUrl}/authenticate`, user)
        .subscribe(
          (response) => resolve(response),
          (error) => {
            console.error('Error en la petición loginUser:', error);
            reject(error);
          }
        );
    });
  }

  registerUser(user: IUsers): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${this.usersUrl}/register`, user)
        .subscribe(
          (response) => resolve(response),
          (error) => {
            console.error('Error en la petición registerUser:', error);
            reject(error);
          }
        );
    });
  }
}