import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // FormGroup para el formulario de inicio de sesión
  loginForm: FormGroup;
  // Constructor del componente que inyecta Router y UsersService
  constructor(private router: Router, private UsersService: UsersService) {
    // Inicializa el formulario de inicio de sesión con FormControl para cada campo
    this.loginForm = new FormGroup({
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      surname: new FormControl(),
      name: new FormControl(),
    });
  }
  // Método que se ejecuta cuando se envía el formulario de inicio de sesión.  Envía los datos del formulario al método de inicio de sesión del servicio. Decodifica el token de acceso para obtener los datos del usuario. Guarda los datos del usuario en el servicio y redirige al usuario a la página del perfil.
  async onSubmit() {
    try {
      const response = await this.UsersService.login(this.loginForm.value);
    

      const decodedToken = JSON.parse(atob(response.token.split('.')[1]));
   

      this.UsersService.setUserData(decodedToken);

      this.router.navigate(['/usuario']);
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
    }
  }
}
