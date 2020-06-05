import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ObservablesService } from "../../../services/observable/observable.service";

@Component({
    selector: 'app-news-source',
    templateUrl: './news-source.component.html',
    styleUrls: ['./news-source.component.scss']
})
export class NewsSourceComponent implements OnInit {

    // PROPERTIES
    faHeart = faHeart;
    protected source: any;
    protected bookmarks;
    @Output() addBookmark = new EventEmitter();

    constructor(private ObservablesService: ObservablesService) {
        this.ObservablesService.getObservableData('bookmarks').subscribe(observerBookmarksData => {
            if (observerBookmarksData === null) {
                // if nothing in observable (after reload for example), fall back to cache
                if (localStorage.getItem('bookmarks')) {
                    this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                } else {
                    this.bookmarks = null;
                }
            } else {
                if (observerBookmarksData) {
                    // // set local storage
                    // if (!localStorage.getItem('bookmarks')) {
                    //     localStorage.setItem('bookmarks', JSON.stringify(observerBookmarksData));
                    // }
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


    // LIFECYCLE HOOKS
    ngOnInit() {

    }

}
