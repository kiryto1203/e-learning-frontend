import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonInfo, CommonInfoJSON} from "../data/common-info";
import {LocalstorageKey} from "../utility/localstorage-key";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let contentType = req.headers.get("Content-Type");
		req = req.clone({
			setHeaders: {
				'Authorization': `Bearer ${this.getToken()}`,
				'Content-Type': contentType ? contentType : "application/json",
			},
			withCredentials: true
		});
		return next.handle(req);
	}
	
	private getToken(): string {
		if(CommonInfo.TOKEN) return CommonInfo.TOKEN;
		let localData = localStorage.getItem(LocalstorageKey.COMMON_INFO);
		if(!localData) return "";
		return (Object.assign(new CommonInfoJSON(), JSON.parse(localData)) as CommonInfoJSON).token;
		
	}
}