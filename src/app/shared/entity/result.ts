export class Result<T> {
	private _code: string;
	private _message: string;
	private _data: T;
	
	
	get code(): string {
		return this._code;
	}
	
	set code(value: string) {
		this._code = value;
	}
	
	get message(): string {
		return this._message;
	}
	
	set message(value: string) {
		this._message = value;
	}
	
	get data(): T {
		return this._data;
	}
	
	set data(value: T) {
		this._data = value;
	}
}