import {Component} from '@angular/core';
import {BaseLayoutComponent} from "../../layout/base-layout-component";
import {CommonInfo} from "../../shared/data/common-info";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginDto} from "../../shared/entity/login-dto";
import {ResultCode} from "../../shared/utility/result-code";
import {Notice} from "../../shared/entity/notice";
import {NoticeType} from "../../shared/utility/NoticeType";
import {ERROR_CODE} from "../../shared/utility/error-code";
import {LogService} from "../../log.service";
import {Result} from "../../shared/entity/result";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements BaseLayoutComponent {
	loginDto: LoginDto;
	isSubmit: boolean;
	notice: Notice;
	
	constructor(private authService: AuthService,
	            private router: Router,
	            private route: ActivatedRoute,
	            private logService: LogService) {
		CommonInfo.PAGE_TITLE.title = "Login to E-Learning system.";
		CommonInfo.PAGE_TITLE.pageName = "Login";
		this.loginDto = new LoginDto();
		this.isSubmit = false;
	}
	
	ngOnInit() {
	}
	
	onLogin(): void {
		this.authService.login(this.loginDto).subscribe(result => {
			this.checkUserActivated(result);
			if(result.code !== ResultCode.OK)
				this.notice = Notice.getInstanceOf(NoticeType.DANGER,ERROR_CODE[result.code]);
			else {
				this.logService.addLog("Login success", result);
				CommonInfo.TOKEN = result.data;
				CommonInfo.IS_LOGIN = true;
				this.router.navigate(['/']);
			}
		})
	}
	
	checkUserActivated(result: Result<string>): void {
		if(result.code !== "054") return;
		this.notice = Notice.getInstanceOf(NoticeType.DANGER,ERROR_CODE[result.code]);
		setTimeout(() => { this.router.navigate(["/verify"])}, 3000);
	}
	
}
