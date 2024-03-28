import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userUrl: string = 'http://localhost:3000/api/users';

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
}
