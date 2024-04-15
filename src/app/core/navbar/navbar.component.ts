import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  //Define una variable que se utiliza para controlar la visibilidad de ciertos elementos en la barra de navegación.
  showUserLi: boolean = false;
  // Define una variable que almacenará los datos del usuario después de ser recuperados del servicio.
  userData: any;

  //Define el constructor del componente e inyecta el servicio del usuario y el router.
  constructor(private userService: UsersService, private router: Router) {}

  //Define el método que se ejecuta cuando el componente se inicializa. En este método, se llama al servicio getUserData() para obtener los datos del usuario y se establece la visibilidad de ciertos elementos en la barra de navegación en función de si hay datos de usuario o no.
  ngOnInit() {
    this.userData = this.userService.getUserData();
    console.log('Datos del usuario:', this.userData);

    this.showUserLi = !!this.userData;
  }

  //Define el método que se llama cuando el usuario hace clic en el botón de cerrar sesión. Este método llama al servicio clearUserData() para borrar los datos del usuario y luego navega a la ruta marcada.

  logout() {
    this.userService.clearUserData();
    this.router.navigate(['/login']);
  }
}
