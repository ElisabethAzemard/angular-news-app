/* IMPORTS */
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';


/* DEFINITION & EXPORT */
@Injectable({
    providedIn: 'root'
})
export class ObservablesService {

    // PROPERTIES
    protected user: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    protected bookmarks: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : null);

    protected bookmarkNews: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('bookmark-news') ? JSON.parse(localStorage.getItem('bookmark-news')) : null);

    protected sources: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('sources') ? JSON.parse(localStorage.getItem('sources')) : null);
    protected source: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('source') ? JSON.parse(localStorage.getItem('source')) : null);
    protected news: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('news') ? JSON.parse(localStorage.getItem('news')) : null);

    constructor() { }


    // METHODS
    // set data
    public setObservableData = (type: string, data: any) => {
        // set observable data
        switch (type) {
        case 'user':
            this.user.next(data);
            break;

        case 'sources':
            this.sources.next(data);
            break;

        case 'news':
            this.news.next(data);
            break;

        case 'source':
            this.source.next(data);
            break;

        case 'bookmarks':
            this.bookmarks.next(data);
            break;

        case 'bookmark-news':
            this.bookmarkNews.next(data);
            break;

        default:
            break;
        }

        // set local storage
        // on log out, remove item instead of setting to null
        if (data === null) {
            localStorage.removeItem(type);
        } else {
            localStorage.setItem(type, JSON.stringify(data));
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

        case 'bookmark-news':
            return this.bookmarkNews;
            break;

        default:
            break;
        }
    };

}
