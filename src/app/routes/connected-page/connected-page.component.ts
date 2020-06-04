/* IMPORTS */
import { Component, OnInit } from '@angular/core';

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
    public userData: any;
    public bookmarks: any;
    public source: any = '';


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
                    // update userData value
                    this.userData = observerUserData;
                } else {
                    this.userData = null;
                }
            }
        });

        this.ObservablesService.getObservableData('source').subscribe(observerSourceData => {
            if (observerSourceData === null) {
                // if nothing in observable (after reload for example), fall back to cache
                if (localStorage.getItem('source')) {
                    this.source = JSON.parse(localStorage.getItem('source'));
                } else {
                    this.source = null;
                }
            } else {
                if (observerSourceData) {
                    // update source value
                    this.source = observerSourceData;
                } else {
                    this.source = null;
                }
            }
        });

        // get bookmarks from observer
        this.ObservablesService.getObservableData('bookmarks').subscribe(observerBookmarksData => {
            if (observerBookmarksData === null) {
                this.bookmarks = null;
            } else {
                if (observerBookmarksData) {
                    // update bookmarks value
                    this.bookmarks = observerBookmarksData;
                } else {
                    this.bookmarks = null;
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
        // get source object from sourcesCollection with id obtained from select form
        for (let [key, source] of Object.entries(this.sourcesCollection)) {
            if (source.id == sourceId) {
                // update current source if different from previous
                if (source !== this.source) {
                    this.source = { info: source };
                    this.source.alreadyBookmarked = false;
                }

                // check for bookmarks existence
                if (this.bookmarks.length > 0) {
                    // check if source is already bookmarked
                    let alreadyBookmarked = this.bookmarks.find((bookmark) => {
                        return bookmark.id == this.source.info.id;
                    });

                    // set alreadyBookmarked value accordingly
                    if (alreadyBookmarked) { this.source.alreadyBookmarked = true; }
                }

                this.ObservablesService.setObservableData('source', this.source);
                localStorage.setItem('source', JSON.stringify(this.source));
            }
        }
    }

    // add bookmark
    public addBookmark = async () => {
        // if source is already bookmarked, return
        if (this.source.alreadyBookmarked) {
            return;
        } else {
            this.source.alreadyBookmarked = true;

            let request = { ...this.source.info, token: localStorage.getItem('token') };
            let newBookmark = await this.CrudService.addBookmark(request);

            this.ObservablesService.setObservableData('source', this.source);
            localStorage.setItem('source', JSON.stringify(this.source));
        }
    };


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
