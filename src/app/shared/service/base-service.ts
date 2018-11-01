import {HttpClient} from "@angular/common/http";

export class BaseService {
	constructor(protected httpClient: HttpClient) {
	}
}