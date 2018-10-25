export class Log {
	private _time: Date;
	private _msg: any;
	private _content: any;
	
	get content(): any {
		return this._content;
	}
	
	set content(value: any) {
		this._content = value;
	}
	
	get time(): Date {
		return this._time;
	}
	
	set time(value: Date) {
		this._time = value;
	}
	
	get msg(): any {
		return this._msg;
	}
	
	set msg(value: any) {
		this._msg = value;
	}
	
	constructor(time: Date, msg: any, content: any) {
		this._time = time;
		this._msg = msg;
		this._content = content;
	}
}