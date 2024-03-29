import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs';
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
    const userData = userDataString ? JSON.parse(userDataString) : null;
    console.log('Datos del usuario:', userData); 
    return userData;
  }

  clearUserData() {
    localStorage.removeItem(this.userDataKey);
  }



  addToFavorites(userId: string, bookId: string): Observable<any> {
    const url = `${this.userUrl}/${userId}/addToFavorites/${bookId}`;
    return this.http.put<any>(url, {}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
