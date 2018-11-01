import {Injectable} from '@angular/core';
import {QuestionService} from '../shared/service/question.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Question} from '../shared/entity/questions';
import {EMPTY, Observable, of} from 'rxjs';
import {BaseResolveService} from "../layout/base-resolve-service";
import {Result} from "../shared/entity/result";
import {NotifierService} from "angular-notifier";
import {CategoryService} from "../shared/service/category.service";
import {LessonService} from "../shared/service/lesson.service";
import {Lesson} from "../shared/entity/lesson";
import {LessonDto} from "../shared/entity/lesson-dto";

@Injectable({
	providedIn: 'root'
})
export class LessonResolveService extends BaseResolveService<Result<LessonDto>> {
	constructor(router: Router,
	            notifier: NotifierService,
	            private lessonService: LessonService) {
		super(router, notifier);
	}
	
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		Observable<Result<LessonDto>> | Promise<Result<LessonDto>> | Result<LessonDto> {
		return this.lessonService.generateLesson(route.paramMap.get("subCategoryCode")).then(lesson => {
			return this.resolvePromise('/test-center',lesson);
		}).catch(result => {
			return this.rejectPromise('/test-center');
		});
	}
	
}
