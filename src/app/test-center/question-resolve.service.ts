import {Injectable} from '@angular/core';
import {QuestionService} from '../shared/service/question.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Question} from '../shared/entity/questions';
import {EMPTY, Observable, of} from 'rxjs';
import {BaseResolveService} from "../layout/base-resolve-service";
import {Result} from "../shared/entity/result";
import {NotifierService} from "angular-notifier";
import {CategoryService} from "../shared/service/category.service";

@Injectable({
	providedIn: 'root'
})
export class QuestionResolveService extends BaseResolveService<Result<Question[]>> {
	constructor(router: Router,
	            notifier: NotifierService,
	            private questionService: QuestionService) {
		super(router, notifier);
	}
	
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] | any {
		let subCategoryCode = route.paramMap.get("subCategoryCode");
		if(!subCategoryCode) this.router.navigate(["/test-center"]);
		this.questionService.getQuestions().then(questions => {
			if (questions) {
				return of(questions);
			} else {
				this.router.navigate(['/']);
				return EMPTY;
			}
		}).catch(result => {
			this.router.navigate(['/']);
			return EMPTY;
		});
	}
	
}
