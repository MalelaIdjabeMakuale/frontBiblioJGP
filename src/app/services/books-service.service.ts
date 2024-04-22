import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  //Declara una variable para almacenar la URL base de la API de libros.

  public booksUrl:string="https://back-biblio-jgp.vercel.app/api/books"
 
 // Inyecta la dependencia que permitirá hacer solicitudes HTTP.
  constructor(private http: HttpClient) { }
  //Define un método que realiza un GET a la API para obtener todos los libros. 
  public getBooks(){
    return this.http.get(this.booksUrl)
  }
//Define un método que toma como argumento book y realiza un POST a la API para agregar un nuevo libro. 
  public postBook(book: any) {
    return this.http.post(this.booksUrl, book);
  }
//Define un método que toma el ID del libro como argumento y realiza una solicitud DELETE a la API para eliminar el libro correspondiente.
  public deleteBook(id: string) {
    return this.http.delete(`${this.booksUrl}/${id}`);
  }
// Define un méotod que toma el ID de un libro como argumento y realiza una solicitud GET a la API para obtener el libro correspondiente. 
  public getBooksByiD(id: string) {
    return this.http.get(`${this.booksUrl}/${id}`);
  }
// Define un método que toma el nombre del autor como argumento y realiza una solicitud GET a la API para obtener libros escritos por ese autor.
  public getBooksByAuthor(author: string) {
    return this.http.get(`${this.booksUrl}?author=${author}`);
  }
//Define un método que toma el género del libro como argumento y realiza una solicitud GET a la API para obtener libros del género especificado.
  public getBooksByGenre (genre: string) {
    return this.http.get(`${this.booksUrl}?author=${genre}`);
  }
//Define un método que toma el ID de un libro y un objeto book como argumentos, y realiza una solicitud PATCH a la API para modificar el libro correspondiente.
  public modificarBook(id: string, book: any) {
    return this.http.patch(`${this.booksUrl}/${id}`, book);
  }

}
