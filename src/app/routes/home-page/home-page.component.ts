import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: []
})
export class HomePageComponent implements OnInit {

  constructor(private AuthService: AuthService, private Router: Router) { }

  public loginUser = async (credentials: any) => {
  // public getUserInfo = async (email: String) => {
    // Get user infos
    // const userInfo = await this.AuthService.readOneItem('users', `email=${email}`);
    const userInfo = await this.AuthService.loginUser(credentials);

    // Check user info
    if (userInfo) {
      // Change route endpoint
      this.Router.navigateByUrl('connected');
    }
  };

  public registerUser = async (user: UserModel) => {
    const userInfo = await this.AuthService.registerUser(user);

    // Check user info
    if (userInfo) {
      // Change route endpoint
      this.Router.navigateByUrl('connected');
    }
  }

  ngOnInit() {
  }

}
