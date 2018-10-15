import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
@Component({
    selector: 'app-test-select',
    templateUrl: './test-select.component.html',
    styleUrls: ['./test-select.component.css'],
    animations: [
        trigger("openClose", [
            state("open", style({
                height: '160px'
            })),
            state("closed", style({
                height: '0px'
            })),
            transition("open => closed", [
                animate('0.2s'),
            ]),
            transition("closed => open", [
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
    @Output() questionCurrentChange = new EventEmitter<Question>();
    @Output() orderChange = new EventEmitter<number>();
    isShowOption: boolean;

    constructor() {
        this.isShowOption = false;
    }

    ngOnInit() { }

    handleSelect(questionCode): void {
        this.questionCurrent = this.questions.find(w => w.question_code === questionCode[1]);
        this.order = this.questionCodes.find(w => w[0] === questionCode[0])[0];
        this.questionCurrentChange.emit(this.questionCurrent);
        this.orderChange.emit(this.order);
        this.showOption();
    }

    showOption(): void {
        this.isShowOption = !this.isShowOption;
    }
}

import {Question} from "../../shared/entity/questions";
