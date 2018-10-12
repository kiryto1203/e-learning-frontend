import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestCenterComponent} from "./test-center/test-center.component";
import {TestContentComponent} from "./test-content/test-content.component";
import {TestNavigateComponent} from "./test-navigate/test-navigate.component";
import {TestSelectComponent} from "./test-select/test-select.component";
import {TestStartComponent} from "./test-start/test-start.component";
import { TestCenterRoutingModule } from './test-center-routing.module';
import {TestEndComponent} from "./test-end/test-end.component";

@NgModule({
  imports: [
    CommonModule,
    TestCenterRoutingModule,
  ],
  declarations: [
      TestCenterComponent,
      TestContentComponent,
      TestNavigateComponent,
      TestSelectComponent,
      TestStartComponent,
      TestEndComponent
  ]
})
export class TestCenterModule { }
