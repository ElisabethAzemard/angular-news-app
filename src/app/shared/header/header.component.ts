import { Component, OnInit } from '@angular/core';
import { ObservablesService } from "../../services/observable/observable.service";
import { Router } from "@angular/router";
// import { UserModel } from "../../models/user.model";
// import { SourceModel } from "../../models/source.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  /*
  Declaration
  */
  // Properties
  public userData: any;
  // public userBookmarks: SourceModel[];

  constructor(private ObservablesService: ObservablesService, private Router: Router) {
    // Get user data observer
    this.ObservablesService.getObservableData('user').subscribe(userDataObserver => {
      if (userDataObserver === null) {
        this.userData = null
      }
      else {
        if (userDataObserver) {
          // Set local storage
          localStorage.setItem('userToken', userDataObserver.data.token);

          // Update userData value
          this.userData = userDataObserver.data.user;
        }
        else {
          this.userData = null
        }
      }
    })

    // Get bookmark observer
  }
  //

  public logout = () => {
    // Delete localstorage
    localStorage.removeItem('userEmail');

    // Set user info obserrbale value
    this.ObservablesService.setObservableData('users', null);
    this.Router.navigateByUrl('/');
  }


  ngOnInit() { };

}
