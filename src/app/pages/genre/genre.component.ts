import { IBooks } from './../../interfaces/i-books';
import { Component } from '@angular/core';
import { BooksServiceService } from '../../services/books-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css',
})
export class GenreComponent {
  // Arreglo para almacenar los géneros de los libros
  public genre: string[] = [];
  // Constructor del componente que inyecta el servicio BooksServiceService
  constructor(private servicio: BooksServiceService) {}
  ngOnInit(): void {
    //Se suscribe al método getBooks del servicio para obtener los libres. Tras obetner los datos de los libros, llama a la función para procesar los géneros.
    this.servicio.getBooks().subscribe((data: any) => {
      const books: IBooks[] = data.data;

      this.processGenre(books);
    });
  }
  // Utiliza un conjunto para obtener géeros únicos de los libros y ordena alfabéticamente los géneros sin importar mayúsculas ni minúsculas.
  processGenre(books: IBooks[]) {
    this.genre = [...new Set(books.map((book) => book.genre))];



    this.genre.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }
}
