import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '../entity/questions';
import {Api} from '../utility/api';
import {LogService} from './log.service';
import {Common} from '../utility/common';
import {Result} from "../entity/result";
import {LessonReportDto} from "../entity/lesson-report-dto";

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
	
	getQuestionCodesFromQuestions(questions: LessonReportDto[]): any[] {
		if (!questions.length) return [];
		const result = [];
		questions.forEach(v => {
			if (v.questionType !== Common.Q_TYPE_PARAGRAPH) {
				result.push(v.lessionReportId.lessionReportQuestionCode);
			}
		});
		return result;
	}
	
	getQuestionFromQuestionCode(questionCode: string, questions: LessonReportDto[]): LessonReportDto {
		return questions.find(w => w.lessionReportId.lessionReportQuestionCode === questionCode);
	}
}