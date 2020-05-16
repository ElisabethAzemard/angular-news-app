/*
Import
*/
// Angular
import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth/auth.service";
import { Router } from '@angular/router';
//

/*
Componant configuration
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
//


/*
Componant class definition
*/
export class AppComponent implements OnInit {

  constructor( private AuthService: AuthService, private Router: Router ) { }

  async ngOnInit() {
    const userInfo = await this.AuthService.getCurrentUserInfo({ 'token': localStorage.getItem('userToken') });
    console.log('localstorage token  ', localStorage.getItem('userToken'))

    // Check user info
    if (userInfo) {
      // Change route endpoint
      this.Router.navigateByUrl('/connected');
    };
  }
}
//
