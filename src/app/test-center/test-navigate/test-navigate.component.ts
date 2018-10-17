import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../shared/entity/questions';
import {QuestionService} from '../question.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {e} from "@angular/core/src/render3";
import {LogService} from "../../log.service";

@Component({
	selector: 'app-test-navigate',
	templateUrl: './test-navigate.component.html',
	styleUrls: ['./test-navigate.component.css'],
	animations: [
		trigger('changeNavigate', [
			state('change', style({
				left: '{{distance}}px'
			}), {params: {distance: '0'}}),
			state('', style({
				left: '{{distance}}px'
			}), {params: {distance: '0'}}),
			transition('* <=> *', [
				animate('0.5s'),
			]),
		])
	]
})
export class TestNavigateComponent implements OnInit {
	@Input() questionCodes: any[];
	@Input() order: number;
	@Input() questions: Question[];
	@Input() questionCurrent: Question;
	@Input() questionParent: Question;
	@Output() questionCurrentChange = new EventEmitter<Question>();
	@Output() orderChange = new EventEmitter<number>();
	@Output() questionParentChange = new EventEmitter<Question>();
	actionNavigate: string;
	distance: number;
	unit: number;
	orderCurrent: number;

	constructor(private questionService: QuestionService,
				private logService: LogService) {
		this.unit = window.innerWidth <= 320 ? 50 : 80;
		this.orderCurrent = 1;
		this.actionNavigate = '';
	}

	ngOnInit() {

	}

	handlePreviousQuestion(): void {
		if (this.order === 1) {
			return;
		}
		this.order -= 1;
		this.changeQuestionByOrder(this.order);
	}

	handleNextQuestion(): void {
		if (this.order === this.questionCodes.length) {
			return;
		}
		this.order += 1;
		this.changeQuestionByOrder(this.order);
	}

	changeQuestionByOrder(order: number): void {
		this.orderChange.emit(order);
		const questionCode = this.questionCodes[this.order - 1];
		this.questionCurrent = this.questions.find(v => v.question_code === questionCode);
		this.questionCurrentChange.emit(this.questionCurrent);
		this.questionParent = this.questionService.getQuestionFromQuestionCode(this.questionCurrent.parent, this.questions);
		this.questionParentChange.emit(this.questionParent);
	}

	changeDistance(): void {
		let change = this.order - 2;
		if (this.order === 1) {
			change = this.order - 1;
		}
		if (this.order === this.questionCodes.length) {
			change = this.order - 3;
		}
		this.distance = -change * this.unit;
	}

	getStateOrderChange(): string {
		if (!this.checkNavigateChange()) {
			return this.actionNavigate;
		}
		this.actionNavigate = !this.actionNavigate ? 'change' : '';
		this.orderCurrent = this.order;
		this.changeDistance();
		return this.actionNavigate;
	}

	checkNavigateChange(): boolean {
		return (this.order !== this.orderCurrent && this.order >= 2 && this.order <= this.questionCodes.length - 1)
			|| (this.orderCurrent < this.questionCodes.length - 1 && this.order === this.questionCodes.length)
			|| (this.orderCurrent > 2 && this.order === 1);
	}

	@HostListener('document:keyup', ['$event'])
	handleArrowButtonEvent(event: KeyboardEvent) {
		if (event.keyCode === 39) { this.handleNextQuestion(); }
		if (event.keyCode === 37) { this.handlePreviousQuestion(); }
	}
}
