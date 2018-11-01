import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationComponent} from './examination/examination.component';
import {TestContentComponent} from './test-content/test-content.component';
import {TestNavigateComponent} from './test-navigate/test-navigate.component';
import {TestSelectComponent} from './test-select/test-select.component';
import {TestStartComponent} from './test-start/test-start.component';
import {TestCenterRoutingModule} from './test-center-routing.module';
import {TestEndComponent} from './test-end/test-end.component';
import {TestCenterComponent} from './test-center/test-center.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		TestCenterRoutingModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		ExaminationComponent,
		TestContentComponent,
		TestNavigateComponent,
		TestSelectComponent,
		TestStartComponent,
		TestEndComponent,
		TestCenterComponent
	]
})
export class TestCenterModule {
}
