import {Component, OnInit} from '@angular/core';
import {CommonInfo} from "../shared/data/common-info";

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
	
	constructor() {
		CommonInfo.PAGE_TITLE.isShow = false;
	}
	
	ngOnInit() {
	}
	
}
