/*
Import
*/
// Angular
import { Component, OnInit } from '@angular/core';

// Inner
import { CrudService } from "../../services/crud/crud.service";
import { ObservablesService } from 'src/app/services/observable/observable.service';
//

/*
Componant configuration
*/
@Component({
  selector: 'app-connected-page',
  templateUrl: './connected-page.component.html',
})
//


/*
Componant class definition
*/
export class ConnectedPageComponent implements OnInit {

  /*
  Declarations
  */
  public postCollection: any;
  public userData: any;

  constructor( private CrudService: CrudService, private ObservablesService: ObservablesService ) {
    // Get user data observer
    this.ObservablesService.getObservableData('user').subscribe(userDataObserver => {
      this.userData = userDataObserver.data.user;
    })
  }
  //


  /*
  Methods
  */
  // Method to get the post list
  public getPostList = async () => {
    this.postCollection = await this.CrudService.readAllItems('posts');
  };
  //


  /*
  Hooks
  */
  ngOnInit() {
    // Get the poost list
    this.getPostList();
  };
  //
};
//
