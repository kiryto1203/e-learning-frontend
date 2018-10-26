import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonInfo} from "../data/common-info";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${CommonInfo.TOKEN}`,
			},
			withCredentials: true
		});
		return next.handle(req);
	}
	
}