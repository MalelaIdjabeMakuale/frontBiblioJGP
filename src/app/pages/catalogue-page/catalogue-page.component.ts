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
  styleUrl: './catalogue-page.component.css'
})
export class CataloguePageComponent implements OnInit {
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
    cover: ''
  };

  constructor(private servicio: BooksServiceService) {}

  ngOnInit(): void {
    this.servicio.getBooks().subscribe((data: any) => {
      this.booksList = data.data;
      this.booksLists = data.data; // Guarda la lista completa
      this.catalogueLength = this.booksList.length;
    });
  }

  updateCatalogueLength(): void {
    this.catalogueLength = this.booksList.length;
  }

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
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
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
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.genre.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyPublisher() {
    const lowerCaseTerm = this.searchPublisher.toLowerCase();

    if (lowerCaseTerm === '') {
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
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
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.country.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

 
  searchBooksbyLanguage() {
    const lowerCaseTerm = this.searchLanguage.toLowerCase();

    if (lowerCaseTerm === '') {
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.language.toLowerCase().includes(lowerCaseTerm)
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyPages() {
    if (this.searchPages === null) {
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.pages <= this.searchPages
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyYear() {
    if (this.searchYear === null) {
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
    } else {
      this.booksList = this.booksLists.filter((book: any) =>
        book.publication_year >= this.searchYear
      );
    }
    this.updateCatalogueLength();
  }

  searchBooksbyBorrowed() {
    if (this.searchBorrowed === '') {
      this.booksList = this.booksLists.slice(); // Restablece la lista completa
    } else {
      const searchBorrowed = this.searchBorrowed.toLowerCase() === 'true';
      this.booksList = this.booksLists.filter((book: IBooks) =>
        book.isBorrowed === searchBorrowed
      );
    }
    this.updateCatalogueLength();
  }
}