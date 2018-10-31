import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../shared/entity/questions';
import {RouterModule} from '@angular/router';
import {LogService} from '../../shared/service/log.service';
import {Common} from '../../shared/utility/common';
import {AnswerUser} from '../../shared/entity/answer-user';
import {Answer} from '../../shared/entity/answer';
import {LocalstorageKey} from '../../shared/utility/localstorage-key';
import {LessonReportDto} from "../../shared/entity/lesson-report-dto";
import {AnswerDto} from "../../shared/entity/answer-dto";

@Component({
	selector: 'app-test-content',
	templateUrl: './test-content.component.html',
	styleUrls: ['./test-content.component.css']
})
export class TestContentComponent implements OnInit {
	@Input() questionCurrent: LessonReportDto;
	@Input() questionParent: LessonReportDto;
	@Input() order: number;
	@Input() answers: AnswerUser[];
	@Output() answersChange = new EventEmitter<AnswerUser[]>();
	
	constructor(private route: RouterModule,
	            private logService: LogService) {
	}
	
	ngOnInit() {
	}
	
	getTitleForAnswerFromIndex(index: number): string {
		return Common.getStringUpperCaseFromIndex(index);
	}
	
	isChooseQuestion() {
		return this.questionCurrent.questionType !== Common.Q_TYPE_ENTER;
	}
	
	isAnswerUser(answer: AnswerDto): boolean {
		const answerUserCurrent = this.answers.find(w => w.questionCode === this.questionCurrent.lessionReportId.lessionReportQuestionCode);
		return answerUserCurrent.answer.includes(answer.answerBankDto.answerCode);
	}
	
	handleChooseAnswer(answer: AnswerDto): void {
		const index = this.getIndexAnswerByQuestionCodeCurrent();
		if (this.questionCurrent.questionType === Common.Q_TYPE_CHOOSE_ONE) {
			this.answers[index].answer = [];
			this.answers[index].answer.push(answer.answerBankDto.answerCode);
		} else if (this.questionCurrent.questionType === Common.Q_TYPE_CHOOSE_MULTIPLE) {
			if (!this.answers[index].answer.includes(answer.answerBankDto.answerCode)) {
				this.answers[index].answer.push(answer.answerBankDto.answerCode);
			} else {
				this.answers[index].answer = this.answers[index].answer.filter(w => w !== answer.answerBankDto.answerCode);
			}
		}
		this.answersChange.emit(this.answers);
		localStorage.setItem(LocalstorageKey.ANSWERS, JSON.stringify(this.answers));
	}
	
	getAnswerUser(): string {
		return this.answers.find(w => w.questionCode === this.questionCurrent.lessionReportId.lessionReportQuestionCode).answer;
	}
	
	handleEnterAnswer(e): void {
		const index = this.getIndexAnswerByQuestionCodeCurrent();
		if (this.questionCurrent.questionType !== Common.Q_TYPE_ENTER) {
			this.logService.addLog('Enter answer with invalid question type');
		}
		this.answers[index].answer = e.target.value;
		this.answersChange.emit(this.answers);
		localStorage.setItem(LocalstorageKey.ANSWERS, JSON.stringify(this.answers));
	}
	
	getIndexAnswerByQuestionCodeCurrent() {
		return this.answers.findIndex(w => w.questionCode === this.questionCurrent.lessionReportId.lessionReportLessionCode);
	}
}
