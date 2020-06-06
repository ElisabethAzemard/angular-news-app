/* IMPORTS */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObservablesService } from '../../services/observable/observable.service';
// import { UserModel } from "../../models/user.model";

/* DEFINITION & EXPORT */
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    // PROPERTIES
    public userData: object;
    // public userBookmarks: SourceModel[]; -> example for typing with models

    // @TODO: implement model for sources / news / bookmarks

    // DEPENDENCIES INJECTION
    constructor(
        private ObservablesService: ObservablesService,
        private Router: Router)
    {
        // get user data observer
        this.ObservablesService
            .getObservableData('user')
            .subscribe(userDataObserver => { this.userData = userDataObserver; });
    }


    // METHODS
    // log out user
    public logout = () => {
        // Set user info observable value
        this.ObservablesService.setObservableData('user', null);
        this.ObservablesService.setObservableData('sources', null);
        this.ObservablesService.setObservableData('news', null);
        this.ObservablesService.setObservableData('bookmarks', null);
        this.ObservablesService.setObservableData('bookmark-news', null);
        this.ObservablesService.setObservableData('source', null);

        // Delete remaining localstorage
        localStorage.removeItem('token');
        localStorage.removeItem('keyword');

        this.Router.navigateByUrl('/');
    };

    public setToggleBurgerNavEventListener = () => {

        const burger = document.querySelector('.navbar-burger');
        const menu = document.querySelector('.navbar-menu');

        burger.addEventListener('click', () => {
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');

        });

    }


    // LIFECYCLE HOOKS
    ngOnInit() {
        this.setToggleBurgerNavEventListener();
    }

}
