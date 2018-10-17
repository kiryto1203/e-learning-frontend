import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
