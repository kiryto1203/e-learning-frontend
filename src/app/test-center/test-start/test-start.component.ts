import {Component, OnInit} from '@angular/core';
import {CommonInfo} from "../../shared/data/common-info";
import {BaseLayoutComponent} from "../../layout/base-layout-component";
import {Router} from "@angular/router";
import {NotifierService} from "angular-notifier";

@Component({
	selector: 'app-test-start',
	templateUrl: './test-start.component.html',
	styleUrls: ['./test-start.component.css']
})
export class TestStartComponent extends BaseLayoutComponent{
	
	constructor(router: Router, notifier: NotifierService) {
		super(router, notifier);
		this.setPageTitle("Welcome to examination.","Start Test");
	}
	
	ngOnInit() {
	}
}
