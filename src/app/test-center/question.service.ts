import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '../shared/entity/questions';
import {Api} from '../shared/utility/api';
import {LogService} from '../log.service';
import {Common} from '../shared/utility/common';
import {Result} from "../shared/entity/result";
import {BaseService} from "../base-service";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class QuestionService extends BaseService {
	constructor(protected router: Router,
	            private httpClient: HttpClient,
	            private logService: LogService) {
		super(router);
	}
	
	getQuestions(): Promise<Result<Question[]>> {
		return this.handleResponse<Question[]>(this.httpClient.get<Result<Question[]>>(Api.GET_LESSON).toPromise());
	}
	
	getQuestionCodesFromQuestions(questions: Question[]): any[] {
		if (!questions.length) {
			return [];
		}
		const result = [];
		questions.forEach(v => {
			if (v.type !== Common.Q_TYPE_PARAGRAPH) {
				result.push(v.question_code);
			}
		});
		return result;
	}
	
	getQuestionFromQuestionCode(questionCode: string, questions: Question[]): Question {
		return questions.find(w => w.question_code === questionCode);
	}
}