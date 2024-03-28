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
  registerForm: FormGroup;

  constructor(private router: Router, private UsersService: UsersService) {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      image: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit(){
   const response = await  this.UsersService.register(this.registerForm.value);
   console.log(response);  
   this.router.navigate(['/login'])
  }



}
