import { Component, OnInit } from '@angular/core';
import {Question} from '../../entity/questions';
import {QuestionService} from '../../service/question/question.service';
import {LocalstorageKey} from '../../utility/localstorage-key';
import {AnswerUser} from '../../entity/answer-user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questions: Question[];
  questionCurrent: Question;
  order: number;
  questionParent: string;
  answers: AnswerUser[];

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute) {
    this.order = 1;
  }

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion(): void {
    this.route.data.subscribe((data: {questions: Question[]}) => {
      this.questions = data.questions;
      this.answers = this.getAnswer();
      this.questionCurrent = this.questions[0];
    });
  }

  getAnswer(): AnswerUser[] {
    console.log(this.questions);
    const answersLocal = localStorage.getItem(LocalstorageKey.ANSWERS);
    if (answersLocal) { return JSON.parse(answersLocal); } else {
      const listAnswerUser = [];
      this.questions.forEach((v, k) => {
        listAnswerUser.push(new AnswerUser(v.question_code, v.type === 2 ? '' : []));
      });
      localStorage.setItem(LocalstorageKey.ANSWERS, JSON.stringify(listAnswerUser));
      return listAnswerUser;
    }
  }
}
