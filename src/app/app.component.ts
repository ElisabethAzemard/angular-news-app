/* IMPORTS */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-root',
    template: '<app-header></app-header><router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

    // DEPENDENCIES INJECTION
    constructor( private AuthService: AuthService, private Router: Router ) { }


    // LIFECYCLE HOOKS
    async ngOnInit() {
        // redirect to 'connected' page if user is logged
        return new Promise((resolve) => {
            this.AuthService.getCurrentUserInfo({ token: localStorage.getItem('token') })
                .then((apiResponse) => {
                    if (apiResponse.message === 'User logged') {
                        // return resolve(this.Router.navigateByUrl('/news'));
                    }
                })
                // don't reject with apiError to avoid console error on home page at first loading
                .catch(() => {
                    this.Router.navigateByUrl('/');
                });
        });

    }

}
