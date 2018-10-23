import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout/layout.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const layoutRoutes: Routes = [
	{ path: '', component: LayoutComponent,
		children: [
			{ path: 'error/404', component: PageNotFoundComponent}
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
