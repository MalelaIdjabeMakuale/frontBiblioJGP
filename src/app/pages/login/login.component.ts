import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private UsersService: UsersService) {
    this.loginForm = new FormGroup({
 
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit(){
    const response = await  this.UsersService.login(this.loginForm.value);
    console.log(response);
    this.router.navigate(['/user'])
   }
 
}
