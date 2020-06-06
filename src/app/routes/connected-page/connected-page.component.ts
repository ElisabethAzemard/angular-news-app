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
        this.ObservablesService
            .getObservableData('user')
            .subscribe(observerUserData => { this.userData = observerUserData; });

        // get all sources from observer
        this.ObservablesService
            .getObservableData('sources')
            .subscribe(observerSourcesData => { this.sourcesCollection = observerSourcesData; });

        // get current source from observer
        this.ObservablesService
            .getObservableData('source')
            .subscribe(observerSourceData => { this.source = observerSourceData; });

        // get current news from observer
        this.ObservablesService
            .getObservableData('news')
            .subscribe(observerNewsData => { this.newsCollection = observerNewsData; });

        // get bookmarks from observer
        this.ObservablesService
            .getObservableData('bookmarks')
            .subscribe(observerBookmarksData => { this.bookmarks = observerBookmarksData; });
    }


    // METHODS
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
    ngOnInit() { }

}
