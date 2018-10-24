import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout/layout.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "../auth/login/login.component";
import {RegisterComponent} from "../auth/register/register.component";

const layoutRoutes: Routes = [
	{ path: '', component: LayoutComponent,
		children: [
			{ path: '', loadChildren: '../auth/auth.module#AuthModule'},
			{ path: 'error/404', component: PageNotFoundComponent },
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },
		]},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(layoutRoutes),
	],
    declarations: [],
	exports: [
		RouterModule
	]
})
export class LayoutRoutingModule { }
