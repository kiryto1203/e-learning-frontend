import {Component, OnInit} from '@angular/core';
import {Question} from '../../shared/entity/questions';
import {QuestionService} from '../question.service';
import {LocalstorageKey} from '../../shared/utility/localstorage-key';
import {AnswerUser} from '../../shared/entity/answer-user';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'examination',
    templateUrl: './examination.component.html',
    styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
    questions: Question[];
    questionCurrent: Question;
    order: number;
    questionParent: Question;
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
            this.questionCodes = this.questionService.getQuestionCodesFromQuestions(this.questions);
            this.questionParent = this.questionService.getQuestionFromQuestionCode(this.questionCurrent.parent, this.questions);
        });
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
