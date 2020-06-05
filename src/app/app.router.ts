/* IMPORTS */
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedPageComponent } from './routes/connected-page/connected-page.component';
import { BookmarksPageComponent } from './routes/bookmarks-page/bookmarks-page.component';


/* EXPORT */
export const AppRouterModule: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'news',
        component: ConnectedPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bookmarks',
        component: BookmarksPageComponent,
        canActivate: [AuthGuard]
    }
];
