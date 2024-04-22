import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css',
})
export class LoginRegisterComponent {
  // FormGroup para el formulario de inicio de sesión
  registerForm: FormGroup;
  // Constructor del componente que inyecta Router y UsersService
  constructor(private router: Router, private UsersService: UsersService) {
    // Inicializa el formulario de inicio de sesión con FormControl para cada campo
    this.registerForm = new FormGroup({
      username: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      image: new FormControl(),
      password: new FormControl(),
      surname: new FormControl(),
    });
  }
  // Método que se ejecuta cuando se envía el formulario de inicio de sesión.
  async onSubmit() {
    const response = await this.UsersService.register(this.registerForm.value);

    this.router.navigate(['/login']);
  }
}
