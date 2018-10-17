import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Question} from '../../shared/entity/questions';
import {QuestionService} from '../question.service';

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
        ])
    ]
})
export class TestSelectComponent implements OnInit {
    @Input() questionCodes: any[];
    @Input() order: number;
    @Input() questions: Question[];
    @Input() questionCurrent: Question;
    @Input() questionParent: Question;
    @Output() questionCurrentChange = new EventEmitter<Question>();
    @Output() orderChange = new EventEmitter<number>();
    @Output() questionParentChange = new EventEmitter<Question>();
    isShowOption: boolean;

    constructor(private questionService: QuestionService) {
        this.isShowOption = false;
    }

    ngOnInit() {
    }

    handleSelect(questionCode): void {
        this.questionCurrent = this.questions.find(w => w.question_code === questionCode);
        this.order = this.questionCodes.findIndex(w => w === questionCode) + 1;
        this.questionCurrentChange.emit(this.questionCurrent);
        this.orderChange.emit(this.order);
        this.questionParentChange.emit(this.questionService.getQuestionFromQuestionCode(this.questionCurrent.parent, this.questions));
        this.showOption();
    }

    showOption(): void {
        this.isShowOption = !this.isShowOption;
    }
}


