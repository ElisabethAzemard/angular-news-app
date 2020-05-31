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
                .catch((apiError: any) => {
                    Promise.reject(apiError.error);
                    this.Router.navigateByUrl('/');
                });
        });
    }

}
