import { IBooks } from './../../../interfaces/i-books';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BooksServiceService } from '../../../services/books-service.service';
import { DetailBookComponent } from '../../detail-book/detail-book.component';

@Component({
  selector: 'app-detail-author',
  standalone: true,
  imports: [DetailBookComponent, RouterLink],
  templateUrl: './detail-author.component.html',
  styleUrl: './detail-author.component.css'
})
export class DetailAuthorComponent implements OnInit { 
  public author: string = '';
  public books: IBooks[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.author = params['author'];
      this.getBooksByAuthor(this.author);
     
    });
  }

  getBooksByAuthor(author: string): void {
    this.bookService.getBooksByAuthor(author).subscribe((data: any) => {
      const allBooks: IBooks[] = data.data;
      this.books = allBooks.filter(book => book.author === author);
      
    });}

}
