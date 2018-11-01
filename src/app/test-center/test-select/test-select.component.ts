import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {QuestionService} from '../../shared/service/question.service';
import {AnswerUser} from '../../shared/entity/answer-user';
import {LessonReportDto} from "../../shared/entity/lesson-report-dto";

@Component({
	selector: 'app-test-select',
	templateUrl: './test-select.component.html',
	styleUrls: ['./test-select.component.css'],
	animations: [
		trigger('openClose', [
			state('open', style({
				height: '160px'
			})),
			state('closed', style({
				height: '0px'
			})),
			transition('open => closed', [
				animate('0.2s'),
			]),
			transition('closed => open', [
				animate('0.1s'),
			])
		]),
		trigger('changeProgress', [
			state('change', style({
				width: '{{distance}}%'
			}), {params: {distance: '0'}}),
			state('', style({
				width: '{{distance}}%'
			}), {params: {distance: '0'}}),
			transition('* <=> *', [
				animate('0.5s'),
			]),
		])
	]
})
export class TestSelectComponent implements OnInit {
	@Input() questionCodes: any[];
	@Input() order: number;
	@Input() questions: LessonReportDto[];
	@Input() questionCurrent: LessonReportDto;
	@Input() questionParent: LessonReportDto;
	@Input() answers: AnswerUser[];
	@Output() questionCurrentChange = new EventEmitter<LessonReportDto>();
	@Output() orderChange = new EventEmitter<number>();
	@Output() questionParentChange = new EventEmitter<LessonReportDto>();
	isShowOption: boolean;
	changeProgress: string;
	distance: number;
	noOfQuestionComplete: number;
	
	constructor(private questionService: QuestionService) {
		this.isShowOption = false;
		this.changeProgress = '';
		this.noOfQuestionComplete = 0;
	}
	
	ngOnInit() {
		this.distance = this.noOfQuestionComplete * (100 / this.questionCodes.length);
	}
	
	handleSelect(questionCode): void {
		this.questionCurrent = this.questions.find(w => w.lessionReportId.lessionReportQuestionCode === questionCode);
		this.order = this.questionCodes.findIndex(w => w === questionCode) + 1;
		this.questionCurrentChange.emit(this.questionCurrent);
		this.orderChange.emit(this.order);
		this.questionParentChange.emit(this.questionService.getQuestionFromQuestionCode(this.questionCurrent.questionParentCode, this.questions));
		this.showOption();
	}
	
	showOption(): void {
		this.isShowOption = !this.isShowOption;
	}
	
	getStateChangeProgress(): string {
		if (this.noOfQuestionComplete === this.getNoOfQuestionComplete(this.answers)) {
			return this.changeProgress;
		}
		this.changeProgress = !this.changeProgress ? 'change' : '';
		this.noOfQuestionComplete = this.getNoOfQuestionComplete(this.answers);
		this.distance = this.noOfQuestionComplete * (100 / this.questionCodes.length);
		return this.changeProgress;
	}
	
	isDone(questionCode: any) {
		return false;
		// return this.answers.find(w => w.questionCode === questionCode).answer.length > 0;
	}
	
	getNoOfQuestionComplete(answers: AnswerUser[]): number {
		let count = 0;
		answers.forEach(w => {
			if (w.answerDto.length > 0) count++;
		});
		return count;
	}
}


