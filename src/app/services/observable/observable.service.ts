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
    protected token: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected news: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected sources: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected lastSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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
            break;

        case 'news':
            this.news.next(data);
            break;

        case 'token':
            this.token.next(data);
                break;

        case 'lastSource':
            this.lastSource.next(data);
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

        case 'lastSource':
            return this.lastSource;
            break;

        default:
            break;
        }
    };

}
