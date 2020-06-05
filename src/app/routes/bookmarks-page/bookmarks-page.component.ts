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
    private bookmarkNewsDisplayed: boolean = false;
    private bookmarkNews: any = false;
    private bookmarkNewsId: string;


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
    }


    // METHODS
    // ----- BOOKMARKS -----
    // remove bookmark
    private removeBookmark = async (bookmarkId: number) => {
        // remove from API & from tempate
        await this.CrudService.removeBookmark(bookmarkId, { token: localStorage.getItem('token') });
        const newbookmarks = this.bookmarks.filter(bookmark => { return bookmark._id !== bookmarkId; });

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

    // @TODO: implement bookmark news view
    private toggleBookmarkNews = async (sourceId) => {
        if (!this.bookmarkNews) {
            this.bookmarkNews = await this.CrudService.getBookmarkNews(`sources=${sourceId}`);
            this.bookmarkNewsId = sourceId;
        } else {
            this.bookmarkNews = false;
            this.bookmarkNewsId = '';
        }
    }


    // LIFECYCLE HOOKS
    ngOnInit() {

    }

}
