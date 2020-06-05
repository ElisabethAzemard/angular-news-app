/* IMPORTS */
import { Component, OnInit } from '@angular/core';

import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks-page.component.html',
    styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent implements OnInit {

    // PROPERTIES
    private bookmarks: any = [];
    private source: any;
    private faHeartBroken = faHeartBroken;


    // DEPENDENCIES INJECTION
    constructor(
        private ObservablesService: ObservablesService,
        private CrudService: CrudService
    ){
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

        // get source from observer
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
    }


    // METHODS
    // remove bookmark
    private removeBookmark = async (bookmarkId: number) => {
        // remove from API & from tempate
        await this.CrudService.removeBookmark(bookmarkId, { token: localStorage.getItem('token') });
        let newbookmarks = this.bookmarks.filter(bookmark => { return bookmark._id !== bookmarkId; });

        // update observable & local storage
        this.ObservablesService.setObservableData('bookmarks', newbookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(newbookmarks));

        // update current source alreadyBookmarked value
        if (this.source) {
            this.source.alreadyBookmarked = false;
            localStorage.setItem('source', JSON.stringify(this.source));
            this.ObservablesService.setObservableData('source', this.source);
        }
    }


    // LIFECYCLE HOOKS
    ngOnInit() { }

}
