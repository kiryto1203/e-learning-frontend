import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TestStartComponent} from '../../component/test-start/test-start.component';
import {TestComponent} from '../../component/test/test.component';
import {QuestionResolveServiceService} from '../../service/question/question-resolve-service.service';

const routes: Routes = [
  {path: '', redirectTo: '/test', pathMatch: 'full'},
  {path: 'test', component: TestStartComponent,
    children: [
      {path: '', component: TestComponent},
      {path: 'started', component: TestComponent, resolve: {questions: QuestionResolveServiceService } }
    ]}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
