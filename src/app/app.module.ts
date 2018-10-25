import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from "./layout/layout.module";
import { HomePageComponent } from './home-page/home-page.component';
import {TokenInterceptor} from "./shared/interceptor/TokenInterceptor";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		LayoutModule,
	
	],
	providers: [ {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
	bootstrap: [AppComponent]
})
export class AppModule {
}