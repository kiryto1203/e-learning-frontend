import {Component, OnInit} from '@angular/core';
import {PageTitle} from "../../shared/entity/page-title";

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
	pageTitle: PageTitle;
	constructor() { }
	
	ngOnInit() {
	}
	
}
