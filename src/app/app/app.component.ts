import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {CommonInfo} from "../shared/data/common-info";
import {ResultCode} from "../shared/utility/result-code";
import {NoticeType} from "../shared/utility/NoticeType";
import {UserService} from "../shared/service/user.service";
import {BaseLayoutComponent} from "../layout/base-layout-component";
import {NotifierService} from "angular-notifier";
import {Common} from "../shared/utility/common";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseLayoutComponent{
	
	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (!(event instanceof NavigationEnd)) return;
			window.scrollTo(0, 0);
		})
	}
	title = 'elearning';
	
	constructor(protected router: Router,
	            private userService: UserService,
	            protected notifier: NotifierService) {
		super(router,notifier);
		CommonInfo.initialize();
	}
}
