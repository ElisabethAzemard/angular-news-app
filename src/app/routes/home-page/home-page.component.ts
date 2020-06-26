/* IMPORTS */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';

import { UserModel } from '../../models/user.model';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    // PROPERTIES
    newsCollection: object;
    sourcesCollection: object;
    registered: boolean = true;
    // @TODO: check private / public everywhere

    // DEPENDENCIES INJECTION
    constructor(
        private AuthService: AuthService,
        private Router: Router,
        private CrudService: CrudService,
        private ObservablesService: ObservablesService)
    {
        // get all sources from observer
        this.ObservablesService
            .getObservableData('sources')
            .subscribe(observerSourcesData => { this.sourcesCollection = observerSourcesData; });

        // get news from observer
        this.ObservablesService
            .getObservableData('news')
            .subscribe(observerNewsData => { this.newsCollection = observerNewsData; });
    }


    // METHODS
    // ----- USER -----
    // log in
    private loginUser = async (credentials: string) => {
        // log in user in Api
        const userInfo = await this.AuthService.loginUser(credentials);

        // set local storage & observer here because token is not accessible from apiResponse.data.token in AuthService
        localStorage.setItem('token', userInfo.token);

        // if login is successful, redirect to /news
        if (userInfo) {
            this.Router.navigateByUrl('/news');
        }
    };

    // display registration form when click on "not registered yet?"
    public displayRegistrationForm = () => {
        this.registered = false;
    }

    // register user
    public registerUser = async (user: UserModel) => {
        // send registration form to auth API
        const userInfo = await this.AuthService.registerUser(user);

        // if user registration is successful, redirect to /news
        if (userInfo) {
            this.Router.navigateByUrl('/news');
        }
    };

    // LIFECYCLE HOOKS
    ngOnInit() { }

}
