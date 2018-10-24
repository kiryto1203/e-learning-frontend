import {Component, OnInit} from '@angular/core';
import {PageTitle} from "../../shared/entity/page-title";
import {BaseLayoutComponent} from "../base-layout-component";
import {CommonInfo} from "../../shared/data/common-info";

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements BaseLayoutComponent {
	pageTitle: PageTitle;
	constructor() {
		this.pageTitle = CommonInfo.PAGE_TITLE;
	}
	
	ngOnInit() {
	}
	
}
