import { Component } from '@angular/core';
import {RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showUserLi: boolean = false;
  userData: any;
  constructor(private userService: UsersService, private router:Router){}

  ngOnInit() {
    this.userData = this.userService.getUserData(); // Obtener los datos del usuario del almacenamiento local
    console.log('Datos del usuario:', this.userData);

    // Verificar si hay datos de usuario y establecer showUserLi en consecuencia
    this.showUserLi = !!this.userData;
  }


  logout() {
    this.userService.clearUserData(); // Limpia los datos del usuario del localStorage
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
