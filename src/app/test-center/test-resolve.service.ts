import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Category} from "../shared/entity/Category";
import {Observable} from "rxjs";
import {BaseResolveService} from "../layout/base-resolve-service";
import {NotifierService} from "angular-notifier";
import {CategoryService} from "../shared/service/category.service";
import {Result} from "../shared/entity/result";
import {Pager} from "../shared/entity/Pager";

@Injectable({
	providedIn: 'root'
})
export class TestResolveService extends BaseResolveService<Result<Pager<Category>>> {
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		Observable<Result<Pager<Category>>> | Promise<Result<Pager<Category>>> | Result<Pager<Category>> {
		return this.categoryService.getCategories().then(result => {
			return this.resolvePromise('/', result);
		}).catch(reason => {
			console.log(reason);
			return this.rejectPromise('/');
		});
	}
	
	constructor(router: Router,
	            notifier: NotifierService,
	            private categoryService: CategoryService) {
		super(router, notifier);
	}
}
