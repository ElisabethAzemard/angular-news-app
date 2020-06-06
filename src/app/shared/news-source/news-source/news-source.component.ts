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


    // DEPENDENCIES INJECTION
    constructor(private ObservablesService: ObservablesService) {
        this.ObservablesService
            .getObservableData('bookmarks')
            .subscribe(observerBookmarksData => { this.bookmarks = observerBookmarksData; });

        this.ObservablesService
            .getObservableData('source')
            .subscribe(observerSourceData => {
                this.source = observerSourceData;
                console.log('sourceData',observerSourceData)
        });
    }


    // LIFECYCLE HOOKS
    ngOnInit() { }

}
