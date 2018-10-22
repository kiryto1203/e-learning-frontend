import {Component, OnInit} from '@angular/core';
import {CommonInfo} from "../../shared/data/common-info";

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
	
	constructor() {
		CommonInfo.PAGE_TITLE.title = "Page Not Found";
		CommonInfo.PAGE_TITLE.pageName = "Error 404";
	}
	
	ngOnInit() {
	}
	
}
