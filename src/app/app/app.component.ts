import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {CommonInfo} from "../shared/data/common-info";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	
	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (!(event instanceof NavigationEnd)) return;
			window.scrollTo(0, 0);
		})
	}
	title = 'elearning';
	
	constructor(private router: Router) {
		CommonInfo.initialize();
	}
}
