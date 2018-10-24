import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LogService {
	log: string[];
	
	constructor() {
		this.log = [];
	}
	
	addLog(msg: any): void {
		const content = `${new Date()}: ${JSON.stringify(msg)}`;
		this.log.push(content);
		console.log(content);
	}
}
