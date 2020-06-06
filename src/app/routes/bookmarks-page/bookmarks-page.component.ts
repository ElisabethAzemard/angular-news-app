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
    private bookmarkNews: any = false;
    private bookmarkNewsId: string;
    private faHeartBroken = faHeartBroken;


    // DEPENDENCIES INJECTION
    constructor(
        private ObservablesService: ObservablesService,
        private CrudService: CrudService)
    {
        // get bookmarks from observer
        this.ObservablesService
            .getObservableData('bookmarks')
            .subscribe(observerBookmarksData => { this.bookmarks = observerBookmarksData; });

        // get current source from observer
        this.ObservablesService
            .getObservableData('source')
            .subscribe(observerSourceData => { this.source = observerSourceData; });
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

        // update current source alreadyBookmarked value
        if (this.source) {
            this.source.alreadyBookmarked = false;
            this.ObservablesService.setObservableData('source', this.source);
        }
    }

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
