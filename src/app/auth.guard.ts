// Imports
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Inner
import { AuthService } from "./services/auth/auth.service";

// Definition
@Injectable({ providedIn: 'root' })

// Export
export class AuthGuard implements CanActivate {

    constructor(
        private AuthService: AuthService,
        private Router: Router,
    ) { }


    canActivate(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.AuthService.getCurrentUserInfo({ 'token': localStorage.getItem('userToken') })
                .then((apiResponse) => {
                    console.log('auth guard api response', apiResponse.length)
                    if (apiResponse.message === "User logged") { return resolve(true) }
                    else { this.Router.navigateByUrl('/') };
                })
                .catch((apiResponse) => this.Router.navigateByUrl('/'))
        })
    }
}
