import {OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Result} from "../shared/entity/result";
import {NotifierService} from "angular-notifier";
import {NoticeType} from "../shared/utility/NoticeType";
import {ERROR_CODE, ERROR_COE_TOKEN} from "../shared/utility/error-code";
import {CommonInfo} from "../shared/data/common-info";

export class BaseLayoutComponent implements OnInit {
	ngOnInit(): void {
	}
	
	constructor(protected router: Router,
	            protected notifier: NotifierService) {
		
	}
	
	protected checkToken(result: Result<any>): void {
		if (ERROR_COE_TOKEN.includes(result.code)) {
			this.notifier.notify(NoticeType.DANGER_ALERT, ERROR_CODE[result.code]);
			this.router.navigate(['/login']);
			CommonInfo.IS_LOGIN = false;
			CommonInfo.TOKEN = '';
		}
	}
}
