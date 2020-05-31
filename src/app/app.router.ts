/* IMPORTS */
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedPageComponent } from './routes/connected-page/connected-page.component';


/* EXPORT */
export const AppRouterModule: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'connected',
        component: ConnectedPageComponent,
        canActivate: [AuthGuard]
    }
];
