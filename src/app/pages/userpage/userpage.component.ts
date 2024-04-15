import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { BooksServiceService } from '../../services/books-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent implements OnInit {

  //Declara una variable que contendrá los datos del usuario. 
  userData: any;
  // Declara una variable que contrendrá la información completa de los libros favoritos del usuario. 
  favoriteBooks: any [] = [];
  //Declara una variable que contrendrá la información completa de los libros leídos del usuario. 
  readBooks: any[] = [];

  constructor(private userService: UsersService, private booksService: BooksServiceService, private router:Router) {}

  ngOnInit() {
  
    this.userData = this.userService.getUserData();
 

    if (this.userData) {
   
      if (this.userData.user_favorites) {
        console.log('favoritos', this.userData.user_favorites);
        this.fetchFavoriteBooksInfo(this.userData.user_favorites)
          .then((bookInfos: any[]) => {
            console.log('Información de los favs:', bookInfos);
            this.favoriteBooks = bookInfos; 
          })
          .catch(error => {
            console.error('Error al obtener la información de los libros favoritos:', error);
          });
      } else {
        console.log('No se encontraron favoritos para este usuario.');
      }

    
      if (this.userData.user_read) {
        console.log('leidos', this.userData.user_read);
        this.fetchReadBooksInfo(this.userData.user_read)
          .then((bookInfos: any[]) => {
            console.log('Información de los leídos:', bookInfos);
            this.readBooks = bookInfos; 
          })
          .catch(error => {
            console.error('Error al obtener la información de los libros leídos:', error);
          });
      } else {
        console.log('No se encontraron libros leídos para este usuario.');
      }
    }
  }


  private fetchFavoriteBooksInfo(bookIds: string[]): Promise<any[]> {
    const promises = bookIds.map((bookId: string) => {
      return this.booksService.getBooksByiD(bookId).toPromise();
    });
    return Promise.all(promises);
  }

 
  private fetchReadBooksInfo(bookIds: string[]): Promise<any[]> {
    const promises = bookIds.map((bookId: string) => {
      return this.booksService.getBooksByiD(bookId).toPromise();
    });
    return Promise.all(promises);
  }
//Define el método que se llama cuando el usuario hace clic en el botón de cerrar sesión. Este método llama al servicio clearUserData() para borrar los datos del usuario y luego navega a la ruta marcada.
  logout() {
    this.userService.clearUserData(); 
    this.router.navigate(['/login']); 
  }
}