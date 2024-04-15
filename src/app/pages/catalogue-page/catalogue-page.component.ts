import { Component, OnInit } from '@angular/core';
import { IBooks } from '../../interfaces/i-books';
import { RouterLink } from '@angular/router';
import { BooksServiceService } from '../../services/books-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogue-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './catalogue-page.component.html',
  styleUrl: './catalogue-page.component.css',
})
export class CataloguePageComponent implements OnInit {
  //Define las propiedades públicas del componente, incluida una lista de libros (booksList), una copia de seguridad de la lista completa de libros (booksLists), y propiedades para cada criterio de búsqueda posible (título, autor, género, etc.).
  public booksList: IBooks[] = [];
  public booksLists: IBooks[] = [];
  public catalogueLength: number = 0;

  public searchTitle: string = '';
  public searchAuthor: string = '';
  public searchYear: number = 0;
  public searchCountry: string = '';
  public searchPages: number = 0;
  public searchPublisher: string = '';
  public searchBorrowed: string = '';
  public searchGenre: string = '';
  public searchLanguage: string = '';

  public currentBook: IBooks = {
    _id: '',
    title: '',
    author: '',
    genre: '',
    publisher: '',
    publication_year: '',
    pages: '',
    image: '',
    country: '',
    language: '',
    isBorrowed: false,
    borrowedBy: '',
    borrowedTo: '',
    cover: '',
  };

  constructor(private servicio: BooksServiceService) {}

  ngOnInit(): void {
    //Este método, se suscribe a this.servicio.getBooks(), que parece ser un método del servicio que devuelve una lista de libros. Cuando se obtienen los datos de los libros, se asignan a booksList y booksLists, y se actualiza la longitud del catálogo.
    this.servicio.getBooks().subscribe((data: any) => {
      this.booksList = data.data;
      this.booksLists = data.data;
      this.catalogueLength = this.booksList.length;
    });
  }

  updateCatalogueLength(): void {
    this.catalogueLength = this.booksList.length;
  }
  //Son los métodos que se utilizan para filtrar la lista de libros según diferentes criterios de búsqueda (título, autor, género, etc.). Estos métodos toman el valor del campo de búsqueda correspondiente, lo convierten a minúsculas, y luego filtran la lista de libros (booksLists) utilizando el método filter(). Si el término de búsqueda está vacío, la lista completa se restaura; de lo contrario, se filtran los libros que coincidan con el término de búsqueda.
  searchBooksbyTitle() {
    const lowerCaseTerm = this.searchTitle.toLowerCase();

    if (lowerCaseTerm === '') {
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.title.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyAuthor() {
    const lowerCaseTerm = this.searchAuthor.toLowerCase();

    if (lowerCaseTerm === '') {
      this.booksList = this.booksLists.slice();
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.author.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyGenre() {
    const lowerCaseTerm = this.searchGenre.toLowerCase();

    if (lowerCaseTerm === '') {
      this.booksList = this.booksLists.slice();
      this.booksList = this.booksLists.filter((book: any) =>
        book.genre.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyPublisher() {
    const lowerCaseTerm = this.searchPublisher.toLowerCase();

    if (lowerCaseTerm === '') {
      this.booksList = this.booksLists.slice();
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.publisher.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyCountry() {
    const lowerCaseTerm = this.searchCountry.toLowerCase();

    if (lowerCaseTerm === '') {
      this.booksList = this.booksLists.slice();
      this.booksList = this.booksLists.filter((book: any) =>
        book.country.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyLanguage() {
    const lowerCaseTerm = this.searchLanguage.toLowerCase();

    if (lowerCaseTerm === '') {
      this.booksList = this.booksLists.slice();
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.language.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyPages() {
    if (this.searchPages === null) {
      this.booksList = this.booksLists.slice();
    } else {
      this.booksList = this.booksLists.filter(
        (book: any) => book.pages <= this.searchPages
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyYear() {
    if (this.searchYear === null) {
      this.booksList = this.booksLists.slice();
      this.booksList = this.booksLists.filter(
        (book: any) => book.publication_year >= this.searchYear
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyBorrowed() {
    if (this.searchBorrowed === '') {
      this.booksList = this.booksLists.slice();
    } else {
      const searchBorrowed = this.searchBorrowed.toLowerCase() === 'true';
      this.booksList = this.booksLists.filter(
        (book: IBooks) => book.isBorrowed === searchBorrowed
      );
    }
    this.updateCatalogueLength();
  }
}
