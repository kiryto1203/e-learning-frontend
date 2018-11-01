import {Component, Input, OnInit} from '@angular/core';
import {LessonReportDto} from "../../shared/entity/lesson-report-dto";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-test-content-list',
    templateUrl: './test-content-list.component.html',
    styleUrls: ['./test-content-list.component.css']
})
export class TestContentListComponent implements OnInit {
    @Input() questionCodes: any[];
    @Input() questions: LessonReportDto[];
    tmpQuestions: LessonReportDto[];

    constructor() {
        console.log("Test Content List");
        this.tmpQuestions = [];
    }

    ngOnInit() {
        console.log(this.questions);
        this.orderQuestion(this.questions);
        console.log(this.tmpQuestions);
    }

    private orderQuestion(questions: LessonReportDto[]) {
        let index = 0;
        while (this.tmpQuestions.length < questions.length) {
            console.log(index);
            console.log(this.tmpQuestions);
            if(this.tmpQuestions.find(w => w.lessonReportId.lessonReportQuestionCode === questions[index].lessonReportId.lessonReportQuestionCode))
                continue;
            this.tmpQuestions.push(...this.getParentAndSiblingQuestion(questions[index],questions));
            index++;
            alert(index);
        }
    }

    private getParentAndSiblingQuestion(question: LessonReportDto, questions: LessonReportDto[]): LessonReportDto[] {
        let result: LessonReportDto[] = [];
        if(question.questionParentCode) {
            let questionParent = this.getRootParentOfQuestion(question);
            result.push(questionParent);
            result.push(...this.getChildrenQuestion(questionParent, questions));
        } else {
            result.push(question);
        }
        return result;
    }

    private getRootParentOfQuestion(question: LessonReportDto): LessonReportDto {
        if(!question.questionParentCode) return null;
        let questionParent = this.questions.find(w=>
            w.lessonReportId.lessonReportQuestionCode === question.questionParentCode);
        return questionParent.questionParentCode ? this.getRootParentOfQuestion(questionParent)
            : questionParent;
    }

    private getChildrenQuestion(questionParent: LessonReportDto, questions: LessonReportDto[]): LessonReportDto[]{
        let result: LessonReportDto[] = [];
        let questionChild: LessonReportDto[] = questions.filter(w => w.questionParentCode === questionParent.lessonReportId.lessonReportQuestionCode);
        alert(questionChild.length);
        console.log(questionChild);
        if(questionChild.length) {
            result.push(...questionChild);
            questionChild.forEach(v => {
                result.push(...this.getChildrenQuestion(v,questions));
            })
        }
        return result;
    }
}
