import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //Declarar las variables para almacenar la URL base de la API de usuarios y la clave utilizada para guardar y recuperar datos de usuario en el local storage del navegador.

  private userUrl: string = 'https://back-biblio-jgp.vercel.app/api/users';
  private userDataKey = 'userData';

  // Inyecta la dependencia que permitirá hacer solicitudes HTTP.
  constructor(private http: HttpClient) {}

  // Toma como objeto los datos del formulario y realiza un POST a la API para registrar un nuevo usuario
  register(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.userUrl}/register`, formValue)
    );
  }
  // Toma como objeto los datos del formulario y realiza un POST para loguear el usuario
  login(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.userUrl}/login`, formValue)
    );
  }
  //Toma los datos del usuario como argumento y los guarda en el local storage.
  setUserData(userData: any) {
    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
  }
  // Recupera los datos del usuario del almacenamiento local del navegador.
  getUserData() {
    const userDataString = localStorage.getItem(this.userDataKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
   
    return userData;
  }
  //Elimina los datos del usuario del almacenamiento local del navegador
  clearUserData() {
    localStorage.removeItem(this.userDataKey);
  }
  //Define un método que toma el ID del usuario y el ID del libro como argumentos, y realiza un PUT a la API para agregar un libro a los favoritos del usuario.
  addToFavorites(userId: string, bookId: string): Observable<any> {
    const url = `${this.userUrl}/${userId}/addToFavorites/${bookId}`;
    return this.http.put<any>(url, {}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  //Definde un método que toma el ID del usuario y el ID del libro como argumentos, y realiza un PUT a la API para agregar un libro a los leídos del usuario.
  addReadBook(userId: string, bookId: string): Observable<any> {
    const url = `${this.userUrl}/${userId}/addReadBook/${bookId}`;
    return this.http.put<any>(url, {}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
