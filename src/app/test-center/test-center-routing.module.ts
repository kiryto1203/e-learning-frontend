import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TestStartComponent} from './test-start/test-start.component';
import {ExaminationComponent} from './examination/examination.component';
import {TestCenterComponent} from './test-center/test-center.component';
import {TestEndComponent} from './test-end/test-end.component';
import {QuestionResolveServiceService} from './question-resolve-service.service';

const testCenterRoutes: Routes = [
	{
		path: '', component: TestCenterComponent,
		children: [
			{path: '', component: TestStartComponent},
			{path: 'start', component: TestStartComponent},
			{path: 'examination', component: ExaminationComponent, resolve: {questions: QuestionResolveServiceService}},
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
