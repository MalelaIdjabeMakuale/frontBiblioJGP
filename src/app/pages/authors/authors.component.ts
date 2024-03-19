import { Component } from '@angular/core';
import { BooksServiceService } from '../../services/books-service.service';
import { IBooks } from '../../interfaces/i-books';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  public authors: string[] = [];
  constructor(private servicio: BooksServiceService) {}

  ngOnInit(): void {
   
    this.servicio.getBooks().subscribe((data: any) => {
      const books: IBooks[] = data.data;
 
      this.processAuthors(books);

    });
  }

  processAuthors(books: IBooks[]) {
  
    this.authors = [...new Set(books.map(book => book.author))];

    console.log("qué autores", this.authors)
  
    this.authors.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }
}
