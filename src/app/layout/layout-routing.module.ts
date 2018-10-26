import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout/layout.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomePageComponent} from "../home-page/home-page.component";

const layoutRoutes: Routes = [
	{
		path: '', component: LayoutComponent,
		children: [
			{path: '', component: HomePageComponent},
			{path: '', loadChildren: '../auth/auth.module#AuthModule'},
			{
				path: 'test-center',
				loadChildren: '../test-center/test-center.module#TestCenterModule',
				data: {preload: true}
			},
			{path: 'error/404', component: PageNotFoundComponent},
		]
	},
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
export class LayoutRoutingModule {
}
