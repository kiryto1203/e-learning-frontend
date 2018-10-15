import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SelectivePreLoadingStrategyService} from "./selective-preloading-strategy.service";

const routes: Routes = [
    {path: '', redirectTo: '/test-center', pathMatch: 'full'},
    {path: 'test-center', loadChildren: './test-center/test-center.module#TestCenterModule', data: {preload: true}},
    {path: '**', component: PageNotFoundComponent}
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
