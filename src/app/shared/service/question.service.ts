import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '../entity/questions';
import {Api} from '../utility/api';
import {LogService} from './log.service';
import {Common} from '../utility/common';
import {Result} from "../entity/result";

@Injectable({
	providedIn: 'root'
})
export class QuestionService {
	constructor(private httpClient: HttpClient,
	            private logService: LogService) {
	}
	
	getQuestions(): Promise<Result<Question[]>> {
		return this.httpClient.get<Result<Question[]>>(Api.GET_LESSON).toPromise();
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