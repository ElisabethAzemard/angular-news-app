/* IMPORTS */
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // request headers setting
    private setHeaders = () => {
        const myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');

        // return header
        return { headers: myHeader };
    };

    // CRUD: read one news
    public readOneItem(endpoint: string, param: string): Promise<any> {
        return this.HttpClient.get(`${environment.newsApiUrl}/${endpoint}?${param}`).toPromise()
            .then(data => this.getData(endpoint, data))
            .catch(this.handleError);
    }

    // CRUD: get top headlines from one source
    public getAllItems(endpoint: string, param1: string = 'language=en', param2?: string): Promise<any> {
        return this.HttpClient.get(`${environment.newsApiUrl}/${endpoint}?${param1}&${param2}&apiKey=${environment.newsApiKey}`)
            .toPromise()
            .then(data => this.getData(endpoint, data))
            .catch(this.handleError);
    }

    // CRUD: get all sources from API
    public getAllSources(): Promise<any> {
        return this.HttpClient.get(`${environment.newsApiUrl}/sources?apiKey=${environment.newsApiKey}`)
            .toPromise()
            .then(data => this.getData('sources', data))
            .catch(this.handleError);
    }

    // get api response
    private getData = (endpoint, apiResponse: any) => {
        // Switch endpoint to set observable value
        switch (endpoint) {
        case 'sources':
            // Set sources observable value
            this.ObservablesService.setObservableData('sources', apiResponse.sources);

            // Return data
            return apiResponse || {};
            break;

        case 'news':
            // Set news observable value
            this.ObservablesService.setObservableData('news', apiResponse);

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
