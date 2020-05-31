/* IMPORTS */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    // DEPENDENCIES INJECTION
    constructor( private AuthService: AuthService, private Router: Router ) { }


    // LIFECYCLE HOOKS
    async ngOnInit() {
        // redirect to 'connected' page if user is logged
        return new Promise((resolve, reject) => {
            this.AuthService.getCurrentUserInfo({ token: localStorage.getItem('token') })
                .then((apiResponse) => {
                    if (apiResponse.message === 'User logged') {
                        return resolve(this.Router.navigateByUrl('/connected'));
                    }
                })
                .catch((apiError: any) => {
                    Promise.reject(apiError.error);
                    this.Router.navigateByUrl('/');
                });
        });

    }

}
