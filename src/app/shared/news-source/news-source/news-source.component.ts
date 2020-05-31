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
        this.ObservablesService.getObservableData('lastSource').subscribe(observerLastSourceData => {
            if (observerLastSourceData === null) {
                this.source = null;
            } else {
                if (observerLastSourceData) {
                    // set local storage
                    if (!localStorage.getItem('lastSource')) {
                        localStorage.setItem('lastSource', JSON.stringify(observerLastSourceData.token));
                    }
                    // update source value
                    this.source = observerLastSourceData;
                } else {
                    this.source = null;
                }
            }
        });
    }


    private getLastSourceFromCache = () => {
        if (localStorage.getItem('lastSource')) {
            this.source = JSON.parse(localStorage.getItem('lastSource'));
        }
    }

    ngOnInit() {
        this.getLastSourceFromCache();
    }

}
