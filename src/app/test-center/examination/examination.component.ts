import {Component, OnInit} from '@angular/core';
import {Question} from '../../shared/entity/questions';
import {QuestionService} from '../../shared/service/question.service';
import {LocalstorageKey} from '../../shared/utility/localstorage-key';
import {AnswerUser} from '../../shared/entity/answer-user';
import {ActivatedRoute, Router} from '@angular/router';
import {Common} from "../../shared/utility/common";
import {LogService} from "../../shared/service/log.service";
import {LessonDto} from "../../shared/entity/lesson-dto";
import {Result} from "../../shared/entity/result";
import {LessonReportDto} from "../../shared/entity/lesson-report-dto";
import {BaseLayoutComponent} from "../../layout/base-layout-component";
import {NotifierService} from "angular-notifier";
import {AnswerDto} from "../../shared/entity/answer-dto";

@Component({
	selector: 'examination',
	templateUrl: './examination.component.html',
	styleUrls: ['./examination.component.css']
})
export class ExaminationComponent extends BaseLayoutComponent {
	lesson: LessonDto;
	questionCurrent: LessonReportDto;
	order: number;
	questionParent: LessonReportDto;
	answers: AnswerDto[];
	questionCodes: any[];
	
	constructor(private questionService: QuestionService,
	            private route: ActivatedRoute,
	            private logService: LogService,
	            protected router: Router,
	            protected notifier: NotifierService) {
		super(router,notifier);
		this.lesson = new LessonDto();
		this.order = 1;
	}
	
	ngOnInit() {
		this.getQuestion();
	}
	
	getQuestion(): void {
		this.route.data.subscribe((data) => {
			this.lesson = data.lesson.data;
			this.answers = this.getAnswer();
			this.questionCurrent = this.lesson.mappedLessionReports[0];
			this.questionCodes = this.questionService.getQuestionCodesFromQuestions(this.lesson.mappedLessionReports);
			this.questionParent = this.questionService.getQuestionFromQuestionCode(this.questionCurrent.questionParentCode,
				this.lesson.mappedLessionReports);
		});
	}
	
	getAnswer(): AnswerUser[] {
		const answersLocal = localStorage.getItem(LocalstorageKey.ANSWERS);
		if (answersLocal) return JSON.parse(answersLocal);
		else {
			const listAnswerUser = [];
			this.lesson.mappedLessionReports.forEach(v => {
				if (v.questionType !== Common.Q_TYPE_PARAGRAPH) {
					listAnswerUser.push(new AnswerUser(v.lessionReportId.lessionReportQuestionCode,
						v.questionType === Common.Q_TYPE_ENTER ? '' : []));
				}
			});
			localStorage.setItem(LocalstorageKey.ANSWERS, JSON.stringify(listAnswerUser));
			return listAnswerUser;
		}
	}
}
