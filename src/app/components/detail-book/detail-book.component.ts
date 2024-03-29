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
  addToFavorites(): void {
    // Verificar si hay datos del usuario
    if (this.userData) {
      // Inicializar favorites si aún no está definido
      if (!this.userData.favorites) {
        this.userData.favorites = [];
      }
      
      // Verificar si ya existe el libro en la lista de favoritos
      if (!this.userData.favorites.includes(this.book._id)) {
        // Si no existe, añadirlo a la lista de favoritos
        this.userData.favorites.push(this.book._id);
        // Actualizar los datos del usuario en la API
        this.userService.updateUserData(this.userData).subscribe(() => {
          console.log('Datos del usuario actualizados en la API');
        });
      }
    }
  }}
