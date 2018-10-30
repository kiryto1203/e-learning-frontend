import {Component} from '@angular/core';
import {BaseLayoutComponent} from "../../layout/base-layout-component";
import {CommonInfo, CommonInfoJSON} from "../../shared/data/common-info";
import {AuthService} from "../../shared/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginDto} from "../../shared/entity/login-dto";
import {ResultCode} from "../../shared/utility/result-code";
import {Notice} from "../../shared/entity/notice";
import {NoticeType} from "../../shared/utility/NoticeType";
import {ERROR_CODE} from "../../shared/utility/error-code";
import {LogService} from "../../shared/service/log.service";
import {Result} from "../../shared/entity/result";
import {NotifierService} from "angular-notifier";
import {LocalstorageKey} from "../../shared/utility/localstorage-key";
import {UserService} from "../../shared/service/user.service";
import {Common} from "../../shared/utility/common";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseLayoutComponent {
	loginDto: LoginDto;
	isSubmit: boolean;
	notice: Notice;
	
	constructor(private authService: AuthService,
	            protected router: Router,
	            private route: ActivatedRoute,
	            private logService: LogService,
	            protected notifier: NotifierService,
	            private userService: UserService) {
		super(router,notifier);
		CommonInfo.PAGE_TITLE.title = "Login to E-Learning system.";
		CommonInfo.PAGE_TITLE.pageName = "Login";
		CommonInfo.PAGE_TITLE.isShow = true;
		this.loginDto = new LoginDto();
		this.isSubmit = false;
	}
	
	ngOnInit() {
	}
	
	onLogin(): void {
		this.authService.login(this.loginDto).subscribe(result => {
			this.checkUserActivated(result);
			if (result.code !== ResultCode.OK)
				this.notice = Notice.getInstanceOf(NoticeType.DANGER, ERROR_CODE[result.code]);
			else {
				this.logService.addLog("Login success", result);
				this.saveToken(result.data);
				this.getCurrentUser(result.data);
				this.notifier.notify(NoticeType.SUCCESS_ALERT,`Login ${this.loginDto.username} account success!`);
				this.router.navigate(['/']);
			}
		})
	}
	
	checkUserActivated(result: Result<string>): void {
		if (result.code !== "054") return;
		this.notice = Notice.getInstanceOf(NoticeType.DANGER, ERROR_CODE[result.code]);
		setTimeout(() => {
			this.router.navigate(["/verify"])
		}, 3000);
	}
	
	private saveToken(token): void {
		CommonInfo.TOKEN = token;
		CommonInfo.IS_LOGIN = true;
		CommonInfo.TIME_EXPIRED = (new Date()).getTime() + Common.TIME_EXIST_OF_TOKEN;
		CommonInfoJSON.saveDataToLocalStorage();
	}
	
	getCurrentUser(token: string): void {
		this.userService.getCurrentUser(token).then(result => {
			if(result.code !== ResultCode.OK) this.notifier.notify(NoticeType.DANGER_ALERT,"Can't get current user info.");
			else {
				CommonInfo.CURRENT_USER = result.data;
				CommonInfoJSON.saveDataToLocalStorage();
			}
		}).catch(error => {
			this.notifier.notify(NoticeType.DANGER_ALERT,"Can't get current user info.");
		});
	}
	
}
