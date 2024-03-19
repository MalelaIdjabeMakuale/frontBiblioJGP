import { Component, OnInit } from '@angular/core';
import { IBooks } from '../../interfaces/i-books';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BooksServiceService } from '../../services/books-service.service';
import { DetailBookComponent } from '../detail-book/detail-book.component';

@Component({
  selector: 'app-detail-genre',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-genre.component.html',
  styleUrl: './detail-genre.component.css'
})
export class DetailGenreComponent implements OnInit{
  public genre: string = '';
  public books: IBooks[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genre = params['genre'];
      this.getBooksByGenre(this.genre);
      console.log("params del genre", this.genre)
    });
  }

  getBooksByGenre(genre: string): void {
    this.bookService.getBooksByGenre(genre).subscribe((data: any) => {
      const allBooks: IBooks[] = data.data;
      this.books = allBooks.filter(book => book.genre === genre);
      console.log("data de los libros", this.books)
    });}

}
