import {Injectable} from '@angular/core';
import {QuestionService} from './question.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Question} from '../shared/entity/questions';
import {EMPTY, Observable, of} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class QuestionResolveServiceService implements Resolve<Question[]> {
	constructor(private questionService: QuestionService,
	            private router: Router) {
	}
	
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] | any {
		this.questionService.getQuestions().then(questions => {
			console.log(questions);
			if (questions) {
				return of(questions);
			} else {
				this.router.navigate(['/']);
				return EMPTY;
			}
		}).catch(result => {
			this.router.navigate(['/']);
			return EMPTY;
		});
	}
	
}
