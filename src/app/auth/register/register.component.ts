import {Component} from '@angular/core';
import {BaseLayoutComponent} from "../../layout/base-layout-component";
import {CommonInfo} from "../../shared/data/common-info";
import {User} from "../../shared/entity/user";
import {LogService} from "../../log.service";
import {AuthService} from "../auth.service";
import {ResultCode} from "../../shared/utility/result-code";
import {ERROR_CODE} from "../../shared/utility/error-code";
import {Router} from "@angular/router";
import {Notice} from "../../shared/entity/notice";
import {NoticeType} from "../../shared/utility/NoticeType";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements BaseLayoutComponent {
	notice: Notice;
	user: User;
	isSubmit: boolean;
	
	constructor(private logService: LogService,
	            private authService: AuthService,
	            private router: Router) {
		CommonInfo.PAGE_TITLE.title = "Register new account.";
		CommonInfo.PAGE_TITLE.pageName = "Register";
		CommonInfo.PAGE_TITLE.isShow = true;
		this.user = new User();
		this.isSubmit = false;
	}
	
	ngOnInit() {
	}
	
	onRegister() {
		this.authService.register(this.user).subscribe(result => {
			if (result.code !== ResultCode.OK)
				this.notice = Notice.getInstanceOf(NoticeType.DANGER, ERROR_CODE[result.code]);
			else {
				this.notice = Notice.getInstanceOf(NoticeType.SUCCESS, "Create new user success.");
				setTimeout(() => {
					this.router.navigate(['/verify/' + btoa(this.user.email)])
				}, 2000);
			}
		})
	}
	
}
