import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { BooksServiceService } from '../../services/books-service.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent implements OnInit {
  userData: any;
  favoriteBooks: any [] = [];


  constructor(private userService: UsersService, private booksService: BooksServiceService) {}

  ngOnInit() {
    // Obtener los datos del usuario del servicio UsersService
    this.userData = this.userService.getUserData();
    console.log('datitos', this.userData);

    if (this.userData && this.userData.user_favorites) {
      console.log('favoritos', this.userData.user_favorites);

      // Obtener la información completa de los libros favoritos
      this.fetchFavoriteBooksInfo(this.userData.user_favorites)
        .then((bookInfos: any[]) => {
          console.log('Información de los favs:', bookInfos);
          // Asignar la información de los libros favoritos
          this.favoriteBooks = bookInfos;
        })
        .catch(error => {
          console.error('Error al obtener la información de los libros favoritos:', error);
        });
    } else {
      console.log('No se encontraron favoritos para este usuario.');
    }
  }

  // Función para obtener la información completa de los libros favoritos
  private fetchFavoriteBooksInfo(bookIds: string[]): Promise<any[]> {
    const promises = bookIds.map((bookId: string) => {
      return this.booksService.getBooksByiD(bookId).toPromise();
    });

    return Promise.all(promises);
  }
}