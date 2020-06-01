import { Component, OnInit, Input } from '@angular/core';
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
    protected source: object;


    constructor(private ObservablesService: ObservablesService) {
        this.ObservablesService.getObservableData('source').subscribe(observerSourceData => {
            if (observerSourceData === null) {
                this.source = null;
            } else {
                if (observerSourceData) {
                    // set local storage
                    if (!localStorage.getItem('source')) {
                        localStorage.setItem('source', JSON.stringify(observerSourceData.token));
                    }
                    // update source value
                    this.source = observerSourceData;
                } else {
                    this.source = null;
                }
            }
        });
    }


    private getsourceFromCache = () => {
        if (localStorage.getItem('source')) {
            this.source = JSON.parse(localStorage.getItem('source'));
        }
    }

    ngOnInit() {
        this.getsourceFromCache();
    }

}
