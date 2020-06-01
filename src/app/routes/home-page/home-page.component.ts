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

    // get news from source on submit
    public getNewsFromSource = async (sourceSelectorFormData: any) => {
        let response;
        if (sourceSelectorFormData.keyword === null) {
            response = await this.CrudService.getTopHeadlines('top-headlines', `sources=${sourceSelectorFormData.source}`);
        } else {
            response = await this.CrudService.getTopHeadlines('top-headlines', `sources=${sourceSelectorFormData.source}`, `q=${sourceSelectorFormData.keyword}`);
            localStorage.setItem('keyword', sourceSelectorFormData.keyword);
        }
        this.newsCollection = response.articles;

        // send current source to Observer & local storage
        this.saveSource(sourceSelectorFormData.source);
    };

    public saveSource = (sourceId) => {
        for (let [key, source] of Object.entries(this.sourcesCollection)) {
            if (source.id == sourceId) {
                // send data to observer and local storage
                this.ObservablesService.setObservableData('source', source);
                localStorage.setItem('source', JSON.stringify(source));
            }
        }
    }

    // get all sources
    public getAllSources = async () => {
        if (localStorage.getItem('sources')) {
            this.sourcesCollection = JSON.parse(localStorage.getItem('sources'));
            this.ObservablesService.setObservableData('sources', this.sourcesCollection);
        }
        else {
            const response = await this.CrudService.getAllSources();
            this.sourcesCollection = response.sources;
        }
    };


    // LIFECYCLE HOOKS
    ngOnInit() {
        // get all sources on page load
        this.getAllSources();
    }

}
