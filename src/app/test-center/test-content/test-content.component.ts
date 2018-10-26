import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../shared/entity/questions';
import {RouterModule} from '@angular/router';
import {LogService} from '../../shared/service/log.service';
import {Common} from '../../shared/utility/common';
import {AnswerUser} from '../../shared/entity/answer-user';
import {Answer} from '../../shared/entity/answer';
import {LocalstorageKey} from '../../shared/utility/localstorage-key';

@Component({
	selector: 'app-test-content',
	templateUrl: './test-content.component.html',
	styleUrls: ['./test-content.component.css']
})
export class TestContentComponent implements OnInit {
	@Input() questionCurrent: Question;
	@Input() questionParent: Question;
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
		return this.questionCurrent.type !== Common.Q_TYPE_ENTER;
	}
	
	isAnswerUser(answer: Answer): boolean {
		const answerUserCurrent = this.answers.find(w => w.questionCode === this.questionCurrent.question_code);
		return answerUserCurrent.answer.includes(answer.answer_id);
	}
	
	handleChooseAnswer(answer: Answer): void {
		const index = this.getIndexAnswerByQuestionCodeCurrent();
		if (this.questionCurrent.type === Common.Q_TYPE_CHOOSE_ONE) {
			this.answers[index].answer = [];
			this.answers[index].answer.push(answer.answer_id);
		} else if (this.questionCurrent.type === Common.Q_TYPE_CHOOSE_MULTIPLE) {
			if (!this.answers[index].answer.includes(answer.answer_id)) {
				this.answers[index].answer.push(answer.answer_id);
			} else {
				this.answers[index].answer = this.answers[index].answer.filter(w => w !== answer.answer_id);
			}
		}
		this.answersChange.emit(this.answers);
		localStorage.setItem(LocalstorageKey.ANSWERS, JSON.stringify(this.answers));
	}
	
	getAnswerUser(): string {
		return this.answers.find(w => w.questionCode === this.questionCurrent.question_code).answer;
	}
	
	handleEnterAnswer(e): void {
		const index = this.getIndexAnswerByQuestionCodeCurrent();
		if (this.questionCurrent.type !== Common.Q_TYPE_ENTER) {
			this.logService.addLog('Enter answer with invalid question type');
		}
		this.answers[index].answer = e.target.value;
		this.answersChange.emit(this.answers);
		localStorage.setItem(LocalstorageKey.ANSWERS, JSON.stringify(this.answers));
	}
	
	getIndexAnswerByQuestionCodeCurrent() {
		return this.answers.findIndex(w => w.questionCode === this.questionCurrent.question_code);
	}
}
