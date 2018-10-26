export class Log {
	constructor(time: Date, msg: any, content: any) {
		this._time = time;
		this._msg = msg;
		this._content = content;
	}

	private _time: Date;

	get time(): Date {
		return this._time;
	}
	
	set time(value: Date) {
		this._time = value;
	}
	
	private _msg: any;
	
	get msg(): any {
		return this._msg;
	}
	
	set msg(value: any) {
		this._msg = value;
	}
	
	private _content: any;
	
	get content(): any {
		return this._content;
	}
	
	set content(value: any) {
		this._content = value;
	}
}