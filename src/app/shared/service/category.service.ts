import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Result} from "../entity/result";
import {Pager} from "../entity/Pager";
import {Category} from "../entity/Category";
import {Api} from "../utility/api";

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	
	constructor(private httpClient: HttpClient) {
	}
	
	getCategories(): Promise<Result<Pager<Category>>> {
		return this.httpClient.get<Result<Pager<Category>>>(Api.GET_QUESTION).toPromise();
	}
}
