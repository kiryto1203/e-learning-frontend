import {Injectable} from '@angular/core';
import {Log} from "../entity/log";
import {LogCallAPI} from "../entity/log-call-api";

@Injectable({
	providedIn: 'root'
})
export class LogService {
	private _log: Log[];
	private _logCallAPIs: LogCallAPI[];
	
	constructor() {
		this._log = [];
		this._logCallAPIs = [];
	}
	
	addLog(msg: any, content: any = null): void {
		this._log.push(new Log(new Date(), msg, content));
	}
	
	getLogs(): Log[] {
		return this._log;
	}
	
	addLogCallAPIs(logCallAPI: LogCallAPI): void {
		this._logCallAPIs.push(logCallAPI);
	}
}
