/* IMPORTS */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ObservablesService } from '../observable/observable.service';

import { environment } from '../../../environments/environment';


/* DEFINITION & EXPORT */
@Injectable()
export class CrudService {

    // DEPENDENCIES INJECTION
    constructor(
        private HttpClient: HttpClient,
        private ObservablesService: ObservablesService
    ) { }

    // METHODS
    // ----- REQUEST SETTINGS -----
    // request headers setting
    private setHeaders = () => {
        const myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');

        // return header
        return myHeader;
    };

    // ----- SOURCES -----
    // CRUD: get all sources & bookmarks from API
    public getAllSources(): Promise<any> {
        return this.HttpClient.get(`${environment.newsApiUrl}/sources?apiKey=${environment.newsApiKey}`)
            .toPromise()
            .then(data => this.getData('sources', data))
            .catch(this.handleError);
    }

    // ----- NEWS -----
    // CRUD: get top headlines from one source
    public getTopHeadlines(endpoint: string, param1: string = 'language=en', param2?: string): Promise<any> {
        return this.HttpClient.get(`${environment.newsApiUrl}/${endpoint}?${param1}&${param2}&apiKey=${environment.newsApiKey}`)
            .toPromise()
            .then(data => this.getData(endpoint, data))
            .catch(this.handleError);
    }

    // ----- BOOKMARKS -----
    // CRUD: add bookmark
    public addBookmark(source: any): Promise<any> {
        return this.HttpClient.post(`${environment.authApiUrl}/bookmark`, source)
            .toPromise()
            .then(data => this.getData('bookmark', data))
            .catch(this.handleError);
    }

    // CRUD: remove bookmark
    public removeBookmark(bookmarkId: number, userToken: any): Promise<any> {
        return this.HttpClient.request('delete', `${environment.authApiUrl}/bookmark/${bookmarkId}`, { headers: this.setHeaders(), body: userToken })
            .toPromise()
            .then(data => this.getData('bookmark', data))
            .catch(this.handleError);
    }


    // ----- RESPONSE HANDLING -----
    // get api response
    private getData = (endpoint, apiResponse: any) => {
        // Switch endpoint to set observable value
        switch (endpoint) {
        case 'sources':
            // Set sources observable value & local storage
            this.ObservablesService.setObservableData('sources', apiResponse.sources);
            localStorage.setItem('sources', JSON.stringify(apiResponse.sources));

            // Return data
            return apiResponse || {};
            break;

        case 'top-headlines':
            // Set news observable value & local storage
            this.ObservablesService.setObservableData('news', apiResponse.articles);
            localStorage.setItem('news', JSON.stringify(apiResponse.articles));

            // Return data
            return apiResponse || {};
            break;

        default:
            return apiResponse || {};
            break;
        }
    };

    // handle api response error
    private handleError = (apiError: any) => Promise.reject(apiError.error);

}
