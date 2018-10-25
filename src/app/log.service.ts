import {Injectable} from '@angular/core';
import {Log} from "./shared/entity/log";

@Injectable({
	providedIn: 'root'
})
export class LogService {
	log: Log[];
	
	constructor() {
		this.log = [];
	}
	
	addLog(msg: any, content: any = null): void {
		this.log.push(new Log(new Date(),msg, content));
	}
	
	getLogs(): Log[] {
		return this.log;
	}
}
