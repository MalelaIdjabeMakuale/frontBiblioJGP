import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AuthenticateService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent implements OnInit {
  ngOnInit(): void {}

  showLoginForm: boolean = true;
  showRegisterForm: boolean = false;

  constructor(private router: Router, private usersService: UsersService) {}

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.showLoginForm && this.loginForm.valid) {
      const loginFormData = this.loginForm.value;


      this.usersService.loginUser(loginFormData).subscribe((response:any) => {
        console.log('se ha logueado?', response);

       localStorage.setItem('user_name',response.name);
      console.log('local.storage', response.name)     
          this.router.navigate(['/catalogo']);
        },
        (error) => {
          console.error('Error during login:', error);
        }
      );
    } else if (!this.showLoginForm && this.registerForm.valid) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      if (password === confirmPassword) {
        const registerFormData = this.registerForm.value;
        this.usersService.createUser(registerFormData).subscribe(
          (response) => {
            console.log('Register successful', response);
            this.router.navigate(['/catalogo']);
          },
          (error) => {
            console.error('Error during registration:', error);
          }
        );
      } else {
        alert('Las contraseñas no son iguales');
      }
    }
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }
}