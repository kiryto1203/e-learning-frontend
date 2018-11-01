import {BaseService} from "./base-service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../entity/user";
import {Result} from "../entity/result";
import {Api} from "../utility/api";

@Injectable({
	providedIn: 'root'
})
export class UserService extends BaseService{
	
	constructor(protected httpClient: HttpClient) {
		super(httpClient);
	}
	
	getCurrentUser(token: string): Promise<Result<User>> {
		return this.httpClient.get<Result<User>>(Api.GET_CURRENT_USER).toPromise();
	}
}