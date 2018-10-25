import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutTopComponent} from './layout-top/layout-top.component';
import {LayoutComponent} from "./layout/layout.component";
import {LayoutHeaderComponent} from './layout-header/layout-header.component';
import {LayoutPageTitleComponent} from './layout-page-title/layout-page-title.component';
import {LayoutFooterComponent} from './layout-footer/layout-footer.component';
import {LayoutBottomComponent} from './layout-bottom/layout-bottom.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthModule} from "../auth/auth.module";
import {HomePageComponent} from "../home-page/home-page.component";

@NgModule({
	imports: [
		CommonModule,
		LayoutRoutingModule,
		AuthModule
	],
	declarations: [
		LayoutComponent,
		LayoutTopComponent,
		LayoutHeaderComponent,
		LayoutPageTitleComponent,
		LayoutFooterComponent,
		LayoutBottomComponent,
		PageNotFoundComponent,
		HomePageComponent
	],
})
export class LayoutModule {
}
