import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SelectivePreLoadingStrategyService} from './selective-preloading-strategy.service';

const routes: Routes = [
	{path: '', loadChildren: './layout/layout.module#LayoutModule'},
	{path: '**', redirectTo: '/error/404', pathMatch: 'full'}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes,
			{
				enableTracing: false,
				preloadingStrategy: SelectivePreLoadingStrategyService
			})
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class AppRoutingModule {
}
