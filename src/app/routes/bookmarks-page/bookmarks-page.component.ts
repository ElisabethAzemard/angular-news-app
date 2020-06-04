/* IMPORTS */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';
import { AuthService } from '../../services/auth/auth.service';

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
    faHeartBroken = faHeartBroken;


    // DEPENDENCIES INJECTION
    constructor(
        private ObservablesService: ObservablesService,
        private AuthService: AuthService,
        private CrudService: CrudService) {
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
    }


    // METHODS
    // remove bookmark
    private removeBookmark = async (bookmarkId: number) => {
        let bookmarkRemoved = await this.CrudService.removeBookmark(bookmarkId, { token: localStorage.getItem('token') });
        let newbookmarks = this.bookmarks.filter(bookmark => { return bookmark._id !== bookmarkId; });
        this.ObservablesService.setObservableData('bookmarks', newbookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(newbookmarks));

        // only if source already defined
        if (this.source) {
            this.source.alreadyBookmarked = false;
            localStorage.setItem('source', JSON.stringify(this.source));
            this.ObservablesService.setObservableData('source', this.source);
        }
    }


    // LIFECYCLE HOOKS
    ngOnInit() {
    }

}
