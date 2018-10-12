import { Injectable } from '@angular/core';
import {QuestionService} from './question.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Question} from '../shared/entity/questions';
import {EMPTY, Observable, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolveServiceService implements Resolve<Question[]>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] {
    return this.questionService.getQuestions().pipe(
      take(1),
      mergeMap(questions => {
        if (questions) { return of(questions); } else {
          this.router.navigate(['/test-center-start']);
          return EMPTY;
        }
      })
    );
  }

  constructor(private questionService: QuestionService,
              private router: Router) { }

}
