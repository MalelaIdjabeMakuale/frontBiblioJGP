import { Component } from '@angular/core';
import { BooksServiceService } from '../../services/books-service.service';
import { IBooks } from '../../interfaces/i-books';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent {
  //Define la propiedad "authors" que es un arreglo de string inicializado como vacío.
  public authors: string[] = [];
  //Define un constructor que toma un parámetro que llama al servicio de libros.
  constructor(private servicio: BooksServiceService) {}

  ngOnInit(): void {
    //Hace una llamada al método getBooks() y realiza una solicitud HTTP para obtener los datos de los libros del servidos. La función subscribe se utiliza para subscribirse a los datos devueltos por esta solicitud.
    this.servicio.getBooks().subscribe((data: any) => {
      const books: IBooks[] = data.data;

      this.processAuthors(books);
    });
  }
  //Toma un arreglo de libros como argumento. PRimero utiliza el map() para crear un arreglo que contenga solo los nombre de los autores de los libros. Luego utilza un set para eliminar duplicados y converite el set nuevamente en un arreglo nuevo. Finalmente los ordena alfabéticamente.
  processAuthors(books: IBooks[]) {
    this.authors = [...new Set(books.map((book) => book.author))];

    this.authors.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }
}
