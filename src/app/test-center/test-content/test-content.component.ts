import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../shared/entity/questions';
import {RouterModule} from '@angular/router';
import {LogService} from '../../log.service';
import {Common} from "../../shared/utility/common";

@Component({
    selector: 'app-test-content',
    templateUrl: './test-content.component.html',
    styleUrls: ['./test-content.component.css']
})
export class TestContentComponent implements OnInit {
    @Input() questionCurrent: Question;
    @Input() questionParent: string;
    @Input() order: number;

    constructor(private route: RouterModule,
                private logService: LogService) {
    }

    ngOnInit() { }

    getTitleForAnswerFromIndex(index: number): string {
        return Common.getStringUpperCaseFromIndex(index);
    }

    isChooseQuestion() {
        return this.questionCurrent.type !== Common.Q_TYPE_ENTER;
    }
}
