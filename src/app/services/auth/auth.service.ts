/* IMPORTS */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ObservablesService } from "../observable/observable.service";
import { UserModel } from "../../models/user.model";
import { environment } from "../../../environments/environment";


/* DEFINITION */
@Injectable( { providedIn: 'root' } )


/* EXPORT */
export class AuthService {

    // Inject HttpCLient & ObservableService into the class
    constructor(
        private HttpClient: HttpClient,
        private ObservablesService: ObservablesService) { }

    private setHeaders = () => {
        // Set header
        let myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');

        // Return header
        return { headers: myHeader };
    }

    // Log in user
    public loginUser(credentials: any): Promise<any> {
        // Make an HTTP POST call
        return this.HttpClient.post(`${environment.authApiUrl}/login`, credentials, this.setHeaders())
            .toPromise()
            .then(data => this.getData(data))
            .catch(this.handleError)
    }

    // Register new user
    public registerUser(user: UserModel): Promise<any> {
        // Make an HTTP POST call
        return this.HttpClient.post(`${environment.authApiUrl}/register`, user, this.setHeaders())
            .toPromise()
            .then(data => this.getData(data))
            .catch(this.handleError)
    }

    // Get user info
    public getCurrentUserInfo(token: Object): Promise<any> {
        return this.HttpClient.post(`${environment.authApiUrl}/me`, token, this.setHeaders())
            .toPromise()
            .then(data => this.getData(data))
            .catch(this.handleError);
    };

    // Fonction to parse SUCCESS response
    private getData = (apiResponse: any) => {
        // Set user info Observable value
        this.ObservablesService.setObservableData('user', apiResponse)
        // let user = this.ObservablesService.getObservableData('user');
        // console.log(user);

        // Return data
        return apiResponse || {};
    }

    // Fonction to parse ERROR response
    private handleError = (apiError: any) => Promise.reject(apiError.error);
}
