import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LogService} from "./log.service";
import {User} from "../entity/user";
import {Result} from "../entity/result";
import {Api} from "../utility/api";
import {Observable} from "rxjs";
import {VerificationDto} from "../entity/verification-dto";
import {LoginDto} from "../entity/login-dto";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	constructor(private httpClient: HttpClient,
	            private logService: LogService) {
	}
	
	register(user: User): Observable<Result<User>> {
		this.logService.addLog("call api register account", user);
		return this.httpClient.post<Result<User>>(Api.REGISTER, user);
	}
	
	verify(verificationDto: VerificationDto): Observable<Result<any>> {
		this.logService.addLog("call api verify account", verificationDto);
		return this.httpClient.post<Result<any>>(Api.VERIFY, verificationDto);
	}
	
	login(loginDto: LoginDto): Observable<Result<string>> {
		this.logService.addLog("call api login account", loginDto);
		return this.httpClient.post<Result<string>>(Api.LOGIN, loginDto);
	}
}

