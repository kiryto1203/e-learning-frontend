import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from "./layout/layout.module";
import {TokenInterceptor} from "./shared/interceptor/TokenInterceptor";
import {NotifierModule} from "angular-notifier";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		NotifierModule.withConfig({
			position: {
				horizontal: {
					position: 'right'
				},
				vertical: {
					position: 'top'
				}
			},
			theme: 'material'
		}),
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		LayoutModule,
	],
	providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
	bootstrap: [AppComponent]
})
export class AppModule {
}