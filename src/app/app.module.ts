import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './component/app/app.component';
import { TestStartComponent } from './component/test-start/test-start.component';
import { TestComponent } from './component/test/test.component';
import { AppRoutingModule } from './router/app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { TestContentComponent } from './component/test-content/test-content.component';
import { TestSelectComponent } from './component/test-select/test-select.component';
import { TestNavigateComponent } from './component/test-navigate/test-navigate.component';

@NgModule({
  declarations: [
    AppComponent,
    TestStartComponent,
    TestComponent,
    TestContentComponent,
    TestSelectComponent,
    TestNavigateComponent,
    TestContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
