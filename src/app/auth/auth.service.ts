import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LogService} from "../log.service";
import {User} from "../shared/entity/user";
import {Result} from "../shared/entity/result";
import {Api} from "../shared/utility/api";
import {Observable} from "rxjs";
import {VerificationDto} from "../shared/entity/verification-dto";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	constructor(private httpClient: HttpClient,
	            private logService: LogService) {
	}
	
	register(user: User): Observable<Result<User>> {
		return this.httpClient.post<Result<User>>(Api.REGISTER, user);
	}
	
	verify(verificationDto: VerificationDto): Observable<Result<any>> {
		return this.httpClient.post<Result<any>>(Api.VERIFY, verificationDto);
	}
}

