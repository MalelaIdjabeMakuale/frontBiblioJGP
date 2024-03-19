import { IBooks } from './../../interfaces/i-books';
import { Component } from '@angular/core';
import { BooksServiceService } from '../../services/books-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent {
  public genre: string[] = [];
  constructor (private servicio: BooksServiceService){}
  ngOnInit(): void {
    this.servicio.getBooks().subscribe((data: any) => {
      const books: IBooks[] = data.data;
 
      this.processGenre(books);

    });
  }

  processGenre(books: IBooks[]) {
  
    this.genre = [...new Set(books.map(book => book.genre))];

    console.log("qué géneros", this.genre)
  
    this.genre.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }
  }


