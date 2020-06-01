/* IMPORTS */
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-connected-page',
    templateUrl: './connected-page.component.html',
    styleUrls: ['./connected-page.component.scss']
})
export class ConnectedPageComponent implements OnInit {

    // PROPERTIES
    public newsCollection: object;
    public sourcesCollection: object;
    public userData: object;


    // DEPENDENCIES INJECTION
    constructor(
        private CrudService: CrudService,
        private ObservablesService: ObservablesService)
    {
        // get user data from observer
        this.ObservablesService.getObservableData('user').subscribe(observerUserData => {
            if (observerUserData === null) {
                this.userData = null;
            } else {
                if (observerUserData) {
                    // set local storage
                    if (!localStorage.getItem('token')) {
                        localStorage.setItem('token', JSON.stringify(observerUserData.token));
                    }
                    // update userData value
                    this.userData = observerUserData;
                } else {
                    this.userData = null;
                }
            }
        });
    }


    // METHODS
    // get all sources
    public getAllSources = async () => {
        const response = await this.CrudService.getAllSources();
        this.sourcesCollection = response.sources;
    };

    // get news from selected source
    public getNewsFromSource = async (sourceSelectorFormData: any) => {
        let response;

        // if no keyword, don't send the parameter
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


    // LIFECYCLE HOOKS
    ngOnInit() {
        // @TODO : use Observer, fallback to local storage and then API => do it in Constructor
        // get sources from local storage, fall back to API
        if (localStorage.getItem('sources')) {
            this.sourcesCollection = JSON.parse(localStorage.getItem('sources'));
            this.ObservablesService.setObservableData('sources', JSON.parse(localStorage.getItem('sources')));
        } else {
            this.getAllSources();
        }

        // get news from local storage
        if (localStorage.getItem('news')) {
            this.newsCollection = JSON.parse(localStorage.getItem('news'));
        }
    }

}
