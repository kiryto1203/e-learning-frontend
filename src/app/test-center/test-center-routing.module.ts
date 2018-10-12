import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TestStartComponent} from "./test-start/test-start.component";
import {TestCenterComponent} from "./test-center/test-center.component";
import {QuestionResolveServiceService} from "./question-resolve-service.service";
import {TestEndComponent} from "./test-end/test-end.component";

const testCenterRoutes: Routes = [
    { path: '', component: TestStartComponent,
        children: [
            { path: '', component: TestCenterComponent,
                children: [
                    { path: 'started', component: TestCenterComponent},
                ]}
        ]
    }
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
export class TestCenterRoutingModule { }
