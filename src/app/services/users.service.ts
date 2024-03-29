import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userUrl: string = 'http://localhost:3000/api/users';
  private userDataKey = 'userData';

  constructor(private http: HttpClient) {}

  register(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.userUrl}/register`, formValue)
    );
  }

  login(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.userUrl}/login`, formValue)
    );
  }

  setUserData(userData: any) {
    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
  }

  getUserData() {
    const userDataString = localStorage.getItem(this.userDataKey);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  clearUserData() {
    localStorage.removeItem(this.userDataKey);
  }



  updateUserData(userData: any) {
    // Enviar una solicitud HTTP para actualizar los datos del usuario en la API
    return this.http.put(`${this.userUrl}/${userData.user_id}`, userData);
  }
}
