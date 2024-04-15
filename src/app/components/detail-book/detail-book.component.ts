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
  //Declara una variable book que contendrá los detalles del libro. El signo de exclamación indica a TypeScript que esta variable será inicializada más tarde.
  book!: IBooks;
  // Define una variable que almacenará los datos del usuario después de ser recuperados del servicio.
  userData: any;
  //Define una variable que se utiliza para controlar la visibilidad de ciertos elementos en la barra de navegación.
  showUserLi: boolean = false;

  //Define el constructor del componente e inyecta las dependencias a utilizar
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
    this.showUserLi = !!this.userData;
  }

  // Este método se llama cuando el usuario hace clic en el botón para agregar el libro a favoritos. En este método se comrpueba si userData y book están definidos. Si están definidos se llama al método addToFavorites del servicio para agregar el libro a la lista de favoritos. Cuando se recibe la respuesta se actualiza userData con los nuevos datos y se muestra una alerta.
  addToFavorites(): void {
    if (this.userData && this.book) {
      this.userService
        .addToFavorites(this.userData.user_id, this.book._id)
        .subscribe(
          (response: any) => {
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
  // Este método se llama cuando el usuario hace clic en el botón para agregar el libro a leídos. En este método se comrpueba si userData y book están definidos. Si están definidos se llama al método addToRead del servicio para agregar el libro a la lista de leídos. Cuando se recibe la respuesta se actualiza userData con los nuevos datos y se muestra una alerta.
  addToRead(): void {
    if (this.userData && this.book) {
      this.userService
        .addReadBook(this.userData.user_id, this.book._id)
        .subscribe(
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
