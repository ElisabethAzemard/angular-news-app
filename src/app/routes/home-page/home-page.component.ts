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


    // DEPENDENCIES INJECTION
    constructor(
        private AuthService: AuthService,
        private Router: Router,
        private CrudService: CrudService,
        private ObservablesService: ObservablesService){ }


    // METHODS
    // ----- USER -----
    // log in
    private loginUser = async (credentials: string) => {
        // log in user in Api
        const userInfo = await this.AuthService.loginUser(credentials);

        // set local storage & observer here because token is not accessible from apiResponse.data.token in AuthService
        localStorage.setItem('token', userInfo.data.token);

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

    // ----- SOURCES -----
    // get all sources
    public getAllSources = async () => {
        if (localStorage.getItem('sources')) {
            this.sourcesCollection = JSON.parse(localStorage.getItem('sources'));
            this.ObservablesService.setObservableData('sources', this.sourcesCollection);
        } else {
            const response = await this.CrudService.getAllSources();
            this.sourcesCollection = response.sources;
        }
    };

    // ----- NEWS -----
    public getOldNews = () => {
        // if news are already in local storage, display them
        if (localStorage.getItem('news')) {
            this.newsCollection = JSON.parse(localStorage.getItem('news'));
        }
    }

    // get news from source on submit
    public getNewsFromSource = async (sourceSelectorFormData: any) => {
        let response;

        // if no keyword is specified, don't send it as a parameter
        if (sourceSelectorFormData.keyword === null) {
            response = await this.CrudService.getTopHeadlines(`sources=${sourceSelectorFormData.source}`);
        } else {
            response = await this.CrudService.getTopHeadlines(`sources=${sourceSelectorFormData.source}`, `q=${sourceSelectorFormData.keyword}`);
            localStorage.setItem('keyword', sourceSelectorFormData.keyword);
        }

        // update current news collection with response articles
        this.newsCollection = response.articles;

        // get current source object from sourcesCollections with source ID
        for (let [key, source] of Object.entries(this.sourcesCollection)) {
            if (source.id == sourceSelectorFormData.source) {
                // send source object to observer and local storage
                this.ObservablesService.setObservableData('source', { info: source });
            }
        }
    };


    // LIFECYCLE HOOKS
    ngOnInit() {
        // get all sources on page load
        this.getAllSources();

        // get previous new from local storage
        this.getOldNews();
    }

}
