import {Component, OnInit} from '@angular/core';
import {Question} from '../../shared/entity/questions';
import {QuestionService} from '../question.service';
import {LocalstorageKey} from '../../shared/utility/localstorage-key';
import {AnswerUser} from '../../shared/entity/answer-user';
import {ActivatedRoute} from '@angular/router';
import {Common} from "../../shared/utility/common";

@Component({
    selector: 'examination',
    templateUrl: './examination.component.html',
    styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
    questions: Question[];
    questionCurrent: Question;
    order: number;
    questionParent: string;
    answers: AnswerUser[];
    questionCodes: any[];

    constructor(private questionService: QuestionService,
                private route: ActivatedRoute) {
        this.order = 1;
    }

    ngOnInit() {
        this.getQuestion();
    }

    getQuestion(): void {
        this.route.data.subscribe((data: { questions: Question[] }) => {
            this.questions = data.questions;
            this.answers = this.getAnswer();
            this.questionCurrent = this.questions[0];
            this.questionCodes = this.getQuestionCodesFromQuestions(this.questions);
        });
    }

    getQuestionCodesFromQuestions(questions: Question[]): any[] {
        if (!questions.length) return [];
        let result = [];
        questions.forEach((v, k) => {
            if(v.type != Common.Q_TYPE_PARAGRAPH)
                result.push([k, v.question_code]);
        });
        return result;
    }


    getAnswer(): AnswerUser[] {
        const answersLocal = localStorage.getItem(LocalstorageKey.ANSWERS);
        if (answersLocal) {
            return JSON.parse(answersLocal);
        } else {
            const listAnswerUser = [];
            this.questions.forEach((v, k) => {
                listAnswerUser.push(new AnswerUser(v.question_code, v.type === 2 ? '' : []));
            });
            localStorage.setItem(LocalstorageKey.ANSWERS, JSON.stringify(listAnswerUser));
            return listAnswerUser;
        }
    }
}
