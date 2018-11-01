import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/entity/user";
import {CommonInfo} from "../../shared/data/common-info";

@Component({
	selector: 'app-layout-top',
	templateUrl: './layout-top.component.html',
	styleUrls: ['./layout-top.component.css']
})
export class LayoutTopComponent implements OnInit {
	currentUser: User;
	constructor() { }
	
	ngOnInit() {
	
	}
	
	isLogin(): boolean {
		this.currentUser = CommonInfo.CURRENT_USER;
		return CommonInfo.IS_LOGIN;
	}
}
