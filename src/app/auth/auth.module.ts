import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VerifyComponent} from './verify/verify.component';
import {EmailValidatorDirective} from "../shared/directive/email-validator.directive";

@NgModule({
	imports: [
		CommonModule,
		AuthRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		LoginComponent,
		RegisterComponent,
		VerifyComponent,
		EmailValidatorDirective
	]
})
export class AuthModule {
}
