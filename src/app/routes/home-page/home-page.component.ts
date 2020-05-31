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


    // DEPENDENCIES INJECTION
    constructor(
        private AuthService: AuthService,
        private Router: Router,
        private CrudService: CrudService,
        private ObservablesService: ObservablesService
    ) {
        if (localStorage.getItem('news')) {
            this.newsCollection = JSON.parse(localStorage.getItem('news'));
        }
    }


    // METHODS
    // login
    private loginUser = async (credentials: string) => {
        // get user info
        const userInfo = await this.AuthService.loginUser(credentials);
        localStorage.setItem('token', userInfo.data.token);

        // check user info
        if (userInfo) {
            this.Router.navigateByUrl('/connected');
        }
    };

    // registration
    public registerUser = async (user: UserModel) => {
        const userInfo = await this.AuthService.registerUser(user);

        // check user info
        if (userInfo) {
            this.Router.navigateByUrl('/connected');
        }
    };

    // get news from source
    public getNewsList = async (sourceSelectorFormData: any) => {
        let response;
        if (sourceSelectorFormData.keyword === null) {
            response = await this.CrudService.getAllItems('top-headlines', `sources=${sourceSelectorFormData.source}`);
        } else {
            response = await this.CrudService.getAllItems('top-headlines', `sources=${sourceSelectorFormData.source}`, `q=${sourceSelectorFormData.keyword}`);
            localStorage.setItem('last-keyword', sourceSelectorFormData.keyword);
        }
        this.newsCollection = response.articles;
        localStorage.setItem('news', JSON.stringify(response.articles));
        localStorage.setItem('last-source', sourceSelectorFormData.source);
    };

    // get all sources
    public getSourcesList = async () => {
        if (localStorage.getItem('sources')) {
            this.sourcesCollection = JSON.parse(localStorage.getItem('sources'));
            this.ObservablesService.setObservableData('sources', JSON.parse(localStorage.getItem('sources')));
        } else {
            console.log('ici');
            const response = await this.CrudService.getAllSources();
            this.sourcesCollection = response.sources;
            console.log('et là', response);
            this.ObservablesService.setObservableData('sources', response.sources);
            localStorage.setItem('sources', JSON.stringify(this.sourcesCollection));
        }
    };


    // LIFECYCLE HOOKS
    ngOnInit() {
        // get all sources on page load
        this.getSourcesList();
    }

}
