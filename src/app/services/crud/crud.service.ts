
// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObservablesService } from "../observable/observable.service";
import { environment } from '../../../environments/environment';
//


/*
Definition
*/
@Injectable()
export class CrudService {

  // Inject module(s) in the service
  constructor(
    private HttpClient: HttpClient,
    private ObservablesService: ObservablesService
  ) { };


  // Method to set header
  private setHeaderRequest = () => {
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Return header
    return { headers: myHeader };
  }

  // CRUD method: create item
  public createItem(endpoint: String, data: any): Promise<any> {
    // Launch request
    return this.HttpClient.post(`${ environment.apiUrl }/${ endpoint }`, data, this.setHeaderRequest()).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // CRUD method: read one item
  public readOneItem(endpoint: String, param: String): Promise<any> {
    console.log(environment);
    return this.HttpClient.get(`${ environment.apiUrl }/${ endpoint }?${param}`).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // CRUD method: read all items
  public readAllItems(endpoint: String): Promise<any> {
    return this.HttpClient.get(`${environment.apiUrl}/${endpoint }`)
      .toPromise()
      .then( data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // CRUD method: edit an item
  public updateItem(endpoint: String, _id: String, data: any): Promise<any> {
    return this.HttpClient.put(`${environment.apiUrl}/${endpoint }/${_id}`, data, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // CRUD method: delete an item
  public deleteItem(endpoint: String, _id: String): Promise<any> {
    return this.HttpClient.delete(`${environment.apiUrl}/${endpoint }/${_id}`, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  /*
  Methods to get API responses
  */
  // Get the API response
  private getData = (endpoint, apiResponse: any) => {
    // Switch endpoint to set observable value
    switch (endpoint) {
      case 'users':
        // Set user info observable value
        this.ObservablesService.setObservableData('user', apiResponse)

        // Return data
        return apiResponse || {};
        break;
      default:
        // Retun data anytime
        return apiResponse || {};
        break;
    };
  };

  // Get the API error
  private handleError = (apiError: any) => Promise.reject(apiError.error);
  //
};
//
