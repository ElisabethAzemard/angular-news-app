/* IMPORTS */
import { Component, OnInit, Input } from '@angular/core';

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
    private newsCollection: object;
    private sourcesCollection: object;
    private userData: any;
    private bookmarks: any;
    private source: any = '';


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

        // get current source from observer
        this.ObservablesService.getObservableData('source').subscribe(observerSourceData => {
            if (observerSourceData === null) {
                // if nothing in observable (after reload for example), fall back to local storage
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

        // get current news from observer
        this.ObservablesService.getObservableData('news').subscribe(observerNewsData => {
            if (observerNewsData === null) {
                // if nothing in observable (after reload for example), fall back to local storage
                if (localStorage.getItem('news')) {
                    this.newsCollection = JSON.parse(localStorage.getItem('news'));
                } else {
                    this.newsCollection = null;
                }
            } else {
                if (observerNewsData) {
                    // update news value
                    this.newsCollection = observerNewsData;
                } else {
                    this.newsCollection = null;
                }
            }
        });

        // get bookmarks from observer
        this.ObservablesService.getObservableData('bookmarks').subscribe(observerBookmarksData => {
            if (observerBookmarksData === null) {
                // if nothing in observable (after reload for example), fall back to local storage
                if (localStorage.getItem('bookmarks')) {
                    this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                } else {
                    this.bookmarks = null;
                }
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

    // ----- SOURCES -----
    // get all sources from local storage, fall back to API
    public getAllSources = async () => {
        if (localStorage.getItem('sources')) {
            this.sourcesCollection = JSON.parse(localStorage.getItem('sources'));
            this.ObservablesService.setObservableData('sources', JSON.parse(localStorage.getItem('sources')));
        } else {
            const response = await this.CrudService.getAllSources();
            this.sourcesCollection = response.sources;
        }
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

                // update observable & local storage
                this.ObservablesService.setObservableData('source', this.source);
            }
        }
    }

    // ----- NEWS -----
    // get top 10 news of selected source from API
    public getNewsFromSource = async (sourceSelectorFormData: any) => {
        let response;

        // if no keyword, don't send the parameter
        if (sourceSelectorFormData.keyword === null) {
            response = await this.CrudService.getTopHeadlines(`sources=${sourceSelectorFormData.source}`);
        } else {
            response = await this.CrudService.getTopHeadlines(`sources=${sourceSelectorFormData.source}`, `q=${sourceSelectorFormData.keyword}`);
            localStorage.setItem('keyword', sourceSelectorFormData.keyword);
        }

        this.newsCollection = response.articles;

        // send current source to Observer & local storage
        this.saveSource(sourceSelectorFormData.source);
    };

    // ----- BOOKMARKS -----
    // add bookmark
    public addBookmark = async () => {
        // if source is already bookmarked, return
        if (this.source.alreadyBookmarked) {
            return;
        } else {
            // update alreadyBookmarked value & send source info to auth API
            this.source.alreadyBookmarked = true;
            await this.CrudService.addBookmark({ ...this.source.info, token: localStorage.getItem('token') });

            // update current source alreadyBookmarked value in observable & local storage
            this.ObservablesService.setObservableData('source', this.source);
        }
    };


    // LIFECYCLE HOOKS
    ngOnInit() {
        // get all sources
        this.getAllSources();
    }

}
