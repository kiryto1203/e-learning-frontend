import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TestStartComponent} from './test-start/test-start.component';
import {ExaminationComponent} from './examination/examination.component';
import {TestCenterComponent} from './test-center/test-center.component';
import {TestEndComponent} from './test-end/test-end.component';
import {LessonResolveService} from './lesson-resolve.service';
import {TestResolveService} from "./test-resolve.service";

const testCenterRoutes: Routes = [
	{
		path: '', component: TestCenterComponent,
		children: [
			{path: '', component: TestStartComponent, resolve: {categories: TestResolveService}},
			{path: 'start', component: TestStartComponent},
			{
				path: 'examination/:subCategoryCode',
				component: ExaminationComponent,
				resolve: {lesson: LessonResolveService}
			},
			{path: 'end', component: TestEndComponent}
		]
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(testCenterRoutes)
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class TestCenterRoutingModule {
}
