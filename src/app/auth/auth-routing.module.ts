import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {VerifyComponent} from "./verify/verify.component";

const authRoutes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'verify/:email', component: VerifyComponent},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(authRoutes)
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class AuthRoutingModule {
}
