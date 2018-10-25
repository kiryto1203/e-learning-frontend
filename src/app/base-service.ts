import {Result} from "./shared/entity/result";
import {ActivatedRoute, Router} from "@angular/router";

export class BaseService {
	constructor(protected router: Router) {
	}
	
	private checkToken(result: Result<any>) {
		return ['051','052'].includes(result.code);
	}
	
	handleResponse<T>(promise: Promise<Result<T>>): Promise<Result<T>> {
		return new Promise<Result<T>>(((resolve, reject) => {
			promise.then(result => {
				if(this.checkToken(result)) this.router.navigate(['/login']);
				resolve(result);
			}).catch(error => {
				reject(error);
			})
		}))
	}
}