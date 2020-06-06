/* IMPORTS */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';


/* DEFINITION & EXPORT */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    // DEPENDENCIES INJECTION
    constructor(
        private AuthService: AuthService,
        private Router: Router,
    ) { }


    canActivate(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.AuthService.getCurrentUserInfo({ token: localStorage.getItem('token') })
                .then((apiResponse) => {
                    if (apiResponse.message === 'User logged') {
                        return resolve(true);
                    } else {
                        this.Router.navigateByUrl('/');
                    }
                })
                // don't reject with apiError to avoid console error on home page at first loading
                .catch(() => {
                    this.Router.navigateByUrl('/');
                });
        });
    }

}
