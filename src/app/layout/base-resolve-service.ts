import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {NotifierService} from "angular-notifier";
import {Result} from "../shared/entity/result";
import {ERROR_CODE, ERROR_COE_TOKEN} from "../shared/utility/error-code";
import {NoticeType} from "../shared/utility/NoticeType";
import {CommonInfo} from "../shared/data/common-info";
import {ResultCode} from "../shared/utility/result-code";

export abstract class BaseResolveService<T> implements Resolve<T>{
	protected constructor(protected router: Router,
	                      protected notifier: NotifierService) {
	}
	
	abstract resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T | any;
	
	protected checkToken(result: Result<any>): boolean {
		if (ERROR_COE_TOKEN.includes(result.code)) {
			this.notifier.notify(NoticeType.DANGER_ALERT, "You must login to use this feature.");
			this.router.navigate(['/login']);
			CommonInfo.IS_LOGIN = false;
			CommonInfo.TOKEN = '';
			return false;
		}
		return true;
	}
	
	protected resolvePromise(url: string, result: Result<any>) {
		if(!this.checkToken(result)) return;
		if(result.code === ResultCode.OK) {
			return result;
		} else {
			this.router.navigate([url]);
			this.notifier.notify(NoticeType.DANGER_ALERT,ERROR_CODE[result.code]);
		}
	}
	
	protected rejectPromise(url: string) {
		this.router.navigate(['/']);
		this.notifier.notify(NoticeType.DANGER_ALERT,"Occurs error when call api to server");
		return null;
	}
}