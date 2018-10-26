export class LogCallAPI {
	constructor(startTime: Date, url: string, body: any, token: string, response: any, executedTime: number) {
		this._startTime = startTime;
		this._url = url;
		this._body = body;
		this._token = token;
		this._response = response;
		this._executedTime = executedTime;
	}

	private _startTime: Date;

	get startTime(): Date {
		return this._startTime;
	}

	set startTime(value: Date) {
		this._startTime = value;
	}

	private _url: string;

	get url(): string {
		return this._url;
	}
	
	set url(value: string) {
		this._url = value;
	}
	
	private _body: any;
	
	get body(): any {
		return this._body;
	}
	
	set body(value: any) {
		this._body = value;
	}
	
	private _token: string;
	
	get token(): string {
		return this._token;
	}
	
	set token(value: string) {
		this._token = value;
	}
	
	private _response: any;
	
	get response(): any {
		return this._response;
	}
	
	set response(value: any) {
		this._response = value;
	}
	
	private _executedTime: number;
	
	get executedTime(): number {
		return this._executedTime;
	}
	
	set executedTime(value: number) {
		this._executedTime = value;
	}
}