import {Component} from '@angular/core';
import {BaseLayoutComponent} from "../../layout/base-layout-component";
import {CommonInfo} from "../../shared/data/common-info";
import {Notice} from "../../shared/entity/notice";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements BaseLayoutComponent {
	constructor() {
		CommonInfo.PAGE_TITLE.title = "Login to E-Learning system.";
		CommonInfo.PAGE_TITLE.pageName = "Login";
	}
	
	ngOnInit() {
	}
	
}
