import { IBooks } from './../../interfaces/i-books';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BooksServiceService } from '../../services/books-service.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-detail-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-book.component.html',
  styleUrl: './detail-book.component.css',
})
export class DetailBookComponent implements OnInit {
  book!: IBooks;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksServiceService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.bookService.getBooksByiD(id).subscribe((data: any) => {
          this.book = data;
        });
      }
    });
    this.userData = this.userService.getUserData();
  }

  addToFavorites(): void { console.log('userdataid', this.userData.user_id)
  console.log ('bookid', this.book._id)
    // Check if user data and book data are available
    if (this.userData && this.book) {
      // Make API call to add book to favorites
      this.userService.addToFavorites(this.userData.user_id, this.book._id).subscribe
      (
        (response: any) => {
          // Update user data in local storage
          this.userData = response.userData;
          this.userService.setUserData(response.userData);
          alert('Libro añadido a favoritos correctamente');
        },
        (error) => {
          console.error('Error adding book to favorites:', error);
          alert('Error al añadir el libro a favoritos');
        }
      );
    }
  }

  addToRead(): void {
    console.log('userdataid', this.userData.user_id);
    console.log('bookid', this.book._id);
    if (this.userData && this.book) {
      this.userService.addReadBook(this.userData.user_id, this.book._id).subscribe(
        (response: any) => {
          this.userData = response.userData;
          this.userService.setUserData(response.userData);
          alert('Libro añadido a leídos correctamente');
        },
        (error) => {
          console.error('Error adding book to read:', error);
          alert('Error al añadir el libro a leídos');
        }
      );
    }
  }

 
}
