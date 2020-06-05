/* IMPORTS */
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


/* DEFINITION & EXPORT */
@Injectable({
    providedIn: 'root'
})
export class ObservablesService {

    // PROPERTIES
    protected user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected bookmarks: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    protected sources: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected source: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected news: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor() { }


    // METHODS
    // set data
    public setObservableData = (type: string, data: any) => {
        switch (type) {
        case 'user':
                this.user.next(data);
            break;

        case 'sources':
            this.sources.next(data);
            localStorage.setItem('sources', JSON.stringify(data));
            break;

        case 'news':
            this.news.next(data);
            localStorage.setItem('news', JSON.stringify(data));

            break;

        case 'source':
            this.source.next(data);
            localStorage.setItem('source', JSON.stringify(data));
            break;

        case 'bookmarks':
            this.bookmarks.next(data);
            localStorage.setItem('bookmarks', JSON.stringify(data));

            break;

        default:
            break;
        }
    };

    // get data
    public getObservableData = (type: string): Observable<any> => {
        switch (type) {
        case 'user':
            return this.user;
            break;

        case 'sources':
            return this.sources;
            break;

        case 'news':
            return this.news;
            break;

        case 'source':
            return this.source;
            break;

        case 'bookmarks':
            return this.bookmarks;
            break;

        default:
            break;
        }
    };

}
