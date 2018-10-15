import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../shared/entity/questions';
import {Api} from '../shared/utility/api';
import {LogService} from '../log.service';

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
}
