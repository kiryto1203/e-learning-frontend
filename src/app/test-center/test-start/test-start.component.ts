import {Component, OnInit} from '@angular/core';
import {CommonInfo} from "../../shared/data/common-info";

@Component({
	selector: 'app-test-start',
	templateUrl: './test-start.component.html',
	styleUrls: ['./test-start.component.css']
})
export class TestStartComponent implements OnInit {
	constructor() {
		CommonInfo.PAGE_TITLE.title = "Welcome to examination.";
		CommonInfo.PAGE_TITLE.pageName = "Start Page";
	}
	
	ngOnInit() {
	}
}
