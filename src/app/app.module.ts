// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router"

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Router
import { AppRouterModule } from "./app.router";

// Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedPageComponent } from './routes/connected-page/connected-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginFormComponent } from './shared/forms/login-form/login-form.component';
import { RegisterFormComponent } from './shared/forms/register-form/register-form.component';
import { ItemPostComponent } from './shared/item-post/item-post.component';
import { NewsSourceSelectorComponent } from "./shared/forms/news-source-selector/news-source-selector.component";

// Service
import { CrudService } from "./services/crud/crud.service";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConnectedPageComponent,
    HeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ItemPostComponent,
    NewsSourceSelectorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouterModule, { onSameUrlNavigation: 'reload' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
