import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../shared/entity/questions';
import {Api} from '../shared/utility/api';
import {LogService} from '../log.service';
import {Common} from '../shared/utility/common';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private httpClient: HttpClient,
    private logService: LogService) { }

  getQuestions(): Observable<Question[]> {
    this.logService.addLog('get question from server');
    return this.httpClient.get<Question[]>(Api.GET_LESSON);
  }

  getQuestionCodesFromQuestions(questions: Question[]): any[] {
      if (!questions.length) { return []; }
      const result = [];
      questions.forEach(v => {
          if (v.type !== Common.Q_TYPE_PARAGRAPH) {
              result.push(v.question_code);
          }
      });
      return result;
  }

  getQuestionFromQuestionCode(questionCode: string, questions: Question[]): Question {
      return questions.find(w => w.question_code === questionCode);
  }
}
