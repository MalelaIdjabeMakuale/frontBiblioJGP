import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent implements OnInit {
  userData: any;


  constructor(private userService: UsersService) {}

  ngOnInit() {
    // Obtener los datos del usuario del servicio UsersService
    this.userData = this.userService.getUserData();
    console.log('datitos', this.userData);
   
  }

}
