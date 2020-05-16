/*
Imports
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//

/*
Definition and export
*/
@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  // Init observable
  protected userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected postsList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected sourcesList: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  public setObservableData = (type: string, data: any) => {
    switch (type) {
      case 'user':
        this.userInfo.next(data);
        break;

      case 'posts':
        this.postsList.next(data);
        break;

      default:
        break;
    };
  };

  public getObservableData = (type: string): Observable<any> => {
    switch (type) {
      case 'user':
          return this.userInfo;
        break;

      case 'posts':
          return this.postsList;
        break;

      default:
        break;
    };
  };

}
//
