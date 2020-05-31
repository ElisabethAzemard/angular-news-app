import { Component, OnInit } from '@angular/core';
import { ObservablesService } from '../../services/observable/observable.service';
import { Router } from '@angular/router';
// import { UserModel } from "../../models/user.model";
// import { SourceModel } from "../../models/source.model";

/* DEFINITION & EXPORT */
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
    public userData: object;
    // public userBookmarks: SourceModel[];

    constructor(private ObservablesService: ObservablesService, private Router: Router) {
        // Get user data observer
        this.ObservablesService.getObservableData('user').subscribe(userDataObserver => {
            if (userDataObserver === null) {
                this.userData = null;
            } else {
                if (userDataObserver) {
                    // Update userData value
                    this.userData = userDataObserver;
                } else {
                    this.userData = null;
                }
            }
        });

        // Get bookmark observer
    }
    //

    public logout = () => {
        // Delete localstorage
        localStorage.removeItem('token');

        // Set user info observable value
        this.ObservablesService.setObservableData('user', null);
        this.ObservablesService.setObservableData('token', null);
        this.ObservablesService.setObservableData('sources', null);
        this.ObservablesService.setObservableData('news', null);
        this.Router.navigateByUrl('/');
    };


    ngOnInit() {}

}
