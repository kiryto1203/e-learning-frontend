import {Component} from '@angular/core';
import {PageTitle} from "../../shared/entity/page-title";
import {BaseLayoutComponent} from "../base-layout-component";
import {Router} from "@angular/router";
import {NotifierService} from "angular-notifier";
import {CommonInfo} from "../../shared/data/common-info";

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseLayoutComponent {
	pageTitle: PageTitle;
	
	constructor(router: Router, notifier: NotifierService) {
		super(router, notifier);
		this.pageTitle = CommonInfo.PAGE_TITLE;
	}
	
	ngOnInit() {
	}
	
}
