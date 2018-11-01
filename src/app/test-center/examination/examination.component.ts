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
import {CommonInfo} from "../../shared/data/common-info";
import {PageTitle} from "../../shared/entity/page-title";

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
	answers: AnswerUser[];
	questionCodes: any[];
	allowEnd: boolean;
	category: any;
	isListMode: boolean;
	
	constructor(private questionService: QuestionService,
	            private route: ActivatedRoute,
	            private logService: LogService,
	            protected router: Router,
	            protected notifier: NotifierService) {
		super(router,notifier);
		CommonInfo.PAGE_TITLE.isShow = false;
		this.lesson = new LessonDto();
		this.order = 1;
		this.allowEnd = false;
		this.category = CommonInfo.CATEGORY;
		this.isListMode = true;
	}
	
	ngOnInit() {
		this.getQuestion();
	}
	
	getQuestion(): void {
		this.route.data.subscribe((data) => {
			this.lesson = data.lesson.data;
			this.answers = this.getAnswer();
			this.questionCurrent = this.lesson.mappedLessonReports[0];
			this.questionCodes = this.questionService.getQuestionCodesFromQuestions(this.lesson.mappedLessonReports);
			this.questionParent = this.questionService.getQuestionFromQuestionCode(this.questionCurrent.questionParentCode,
				this.lesson.mappedLessonReports);
		});
	}
	
	getAnswer(): AnswerUser[] {
		const answersLocal = localStorage.getItem(LocalstorageKey.ANSWERS);
		if (answersLocal) return JSON.parse(answersLocal);
		else {
			const listAnswerUser = [];
			this.lesson.mappedLessonReports.forEach(v => {
				if (v.questionType !== Common.Q_TYPE_PARAGRAPH)
					listAnswerUser.push(new AnswerUser(v.lessonReportId.lessonReportQuestionCode,[]));
			});
			localStorage.setItem(LocalstorageKey.ANSWERS, JSON.stringify(listAnswerUser));
			return listAnswerUser;
		}
	}
}
