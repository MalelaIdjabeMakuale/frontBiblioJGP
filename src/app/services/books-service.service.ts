import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  public booksUrl:string="http://localhost:3000/api/books"
 

  constructor(private http: HttpClient) { }
  
  public getBooks(){
    return this.http.get(this.booksUrl)
  }

  public postBook(book: any) {
    return this.http.post(this.booksUrl, book);
  }

  public deleteBook(id: string) {
    return this.http.delete(`${this.booksUrl}/${id}`);
  }

  public getBooksByiD(id: string) {
    return this.http.get(`${this.booksUrl}/${id}`);
  }

  public getBooksByAuthor(author: string) {
    return this.http.get(`${this.booksUrl}?author=${author}`);
  }

  public getBooksByGenre (genre: string) {
    return this.http.get(`${this.booksUrl}?author=${genre}`);
  }

  public modificarBook(id: string, book: any) {
    return this.http.patch(`${this.booksUrl}/${id}`, book);
  }

}
