import { Component, OnInit } from '@angular/core';
import { IBooks } from '../../interfaces/i-books';
import { RouterLink } from '@angular/router';
import { BooksServiceService } from '../../services/books-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public booksList: IBooks[] = [];
  public booksLists: IBooks[] = [];
  public novels: IBooks[] = [];
  public nonFiction: IBooks[] = [];
  public poetry: IBooks[] = [];
  public graphicNovels: IBooks[] = [];
  public shortStories: IBooks[] = [];

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
    this.servicio.getBooks().subscribe((data: any) => {
      this.booksList = data.data;
      console.log(data);

      this.novels = this.booksList.filter((book) => book.genre === 'novela');

      this.nonFiction = this.booksList.filter(
        (book) => book.genre === 'no ficción'
      );

      this.poetry = this.booksList.filter(book => book.genre === 'poesía');
      this.graphicNovels = this.booksList.filter(book => book.genre === 'novela gráfica');
      this.shortStories = this.booksList.filter(book => book.genre === 'relatos');


      this.showRandomBook();

      setInterval(() => {
        this.showRandomBook();
      }, 5000);
    });
  }

  showRandomBook(): void {
    const randomIndex = Math.floor(Math.random() * this.booksList.length);

    const randomBook = this.booksList[randomIndex];

    const bookInfoElement = document.getElementById('bookInfo');
    if (bookInfoElement) {
      bookInfoElement.innerHTML = `
        <div><b>${randomBook.title}</b> </div>
        <div> <img src="https://i.ibb.co/F4schKv/A4-documento-Portada-minimalista-negro.png" style="max-width: 20%; height: auto; padding:4px"></div>
        <div>${randomBook.author}</div>
       
       
      `;
    }
  }
}
