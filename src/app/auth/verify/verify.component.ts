import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/entity/user";
import {BaseLayoutComponent} from "../../layout/base-layout-component";
import {Notice} from "../../shared/entity/notice";
import {Common} from "../../shared/utility/common";
import {VerificationDto} from "../../shared/entity/verification-dto";
import {AuthService} from "../auth.service";
import {ResultCode} from "../../shared/utility/result-code";
import {NoticeType} from "../../shared/utility/NoticeType";
import {ERROR_CODE} from "../../shared/utility/error-code";
import {CommonInfo} from "../../shared/data/common-info";

@Component({
	selector: 'app-verify',
	templateUrl: './verify.component.html',
	styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements BaseLayoutComponent {
	verificationDto: VerificationDto;
	isSubmit: boolean;
	notice: Notice;
	lengthCode: number;
	
	constructor(private route: ActivatedRoute,
	            private authService: AuthService,
	            private router: Router) {
		CommonInfo.PAGE_TITLE.title = "Verify account.";
		CommonInfo.PAGE_TITLE.pageName = "Verify";
		this.verificationDto = new VerificationDto();
		this.lengthCode = Common.DEFAULT_RANDOM_CHARACTER_LENGTH;
	}
	
	ngOnInit() {
		this.verificationDto.email = this.getEmail();
	}
	
	getEmail() {
		return atob(this.route.snapshot.paramMap.get("email"));
	}
	
	onVerify() {
		this.verificationDto.activatedAt = new Date();
		this.authService.verify(this.verificationDto).subscribe(result => {
			if(result.code !== ResultCode.OK)
				this.notice = Notice.getInstanceOf(NoticeType.DANGER,ERROR_CODE[result.code]);
			else {
				this.notice = Notice.getInstanceOf(NoticeType.SUCCESS,"Verify user success.");
				setTimeout(() => { this.router.navigate(['/login']) },2000);
			}
		})
	}
}
