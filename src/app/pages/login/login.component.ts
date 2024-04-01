import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private UsersService: UsersService) {
    this.loginForm = new FormGroup({
 
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      surname: new FormControl(),
      name: new FormControl()
    });
  }

  async onSubmit(){
    try {
      const response = await this.UsersService.login(this.loginForm.value);
      console.log('respuesta', response);
      
      const decodedToken = JSON.parse(atob(response.token.split('.')[1])); // Decodificar token JWT
      console.log('Datos del usuario:', decodedToken);
      
      this.UsersService.setUserData(decodedToken); // Almacenar los datos del usuario en el almacenamiento local
      
      this.router.navigate(['/usuario']); // Redirigir a la página de usuario
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
    }
   }
 
}
