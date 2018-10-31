import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Result} from "../entity/result";
import {LessonDto} from "../entity/lesson-dto";
import {Api} from "../utility/api";

@Injectable({
	providedIn: 'root'
})
export class LessonService {
	constructor(private httpClient: HttpClient) {
	}
	
	generateLesson(subCategoryCode: string): Promise<Result<LessonDto>> {
		return this.httpClient.post<Result<LessonDto>>(Api.GET_LESSON,subCategoryCode, {
			headers: {
				"Content-Type": "text/plain"
			}
		}).toPromise();
	}
	
}