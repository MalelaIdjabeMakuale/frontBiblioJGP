import { IBooks } from './../../interfaces/i-books';
import { Component, OnInit} from '@angular/core';
import { RouterLink,ActivatedRoute } from '@angular/router';
import { BooksServiceService } from '../../services/books-service.service';


@Component({
  selector: 'app-detail-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-book.component.html',
  styleUrl: './detail-book.component.css'
})
export class DetailBookComponent implements OnInit {book!: IBooks;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.bookService.getBooksByiD(id).subscribe((data: any) => {
          this.book = data;
        });
      }
    });
  }

}
