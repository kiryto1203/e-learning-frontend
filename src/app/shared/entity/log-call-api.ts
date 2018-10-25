export class LogCallAPI {
	private _startTime: Date;
	private _url: string;
	private _body: any;
	private _token: string;
	private _response: any;
	private _executedTime: number;
	
	
	constructor(startTime: Date, url: string, body: any, token: string, response: any, executedTime: number) {
		this._startTime = startTime;
		this._url = url;
		this._body = body;
		this._token = token;
		this._response = response;
		this._executedTime = executedTime;
	}
	
	get startTime(): Date {
		return this._startTime;
	}
	
	set startTime(value: Date) {
		this._startTime = value;
	}
	
	get url(): string {
		return this._url;
	}
	
	set url(value: string) {
		this._url = value;
	}
	
	get body(): any {
		return this._body;
	}
	
	set body(value: any) {
		this._body = value;
	}
	
	get token(): string {
		return this._token;
	}
	
	set token(value: string) {
		this._token = value;
	}
	
	get response(): any {
		return this._response;
	}
	
	set response(value: any) {
		this._response = value;
	}
	
	get executedTime(): number {
		return this._executedTime;
	}
	
	set executedTime(value: number) {
		this._executedTime = value;
	}
}