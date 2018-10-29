import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-layout-header',
	templateUrl: './layout-header.component.html',
	styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
	isSearchBoxEnable: boolean;
	constructor() {
		this.isSearchBoxEnable = false;
	}
	
	ngOnInit() {
	}
	
	handleClickSearchBox(): void {
		this.isSearchBoxEnable = !this.isSearchBoxEnable;
	}
	
}
