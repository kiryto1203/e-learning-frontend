export class Result<T> {
	private _code: string;

	get code(): string {
		return this._code;
	}

	set code(value: string) {
		this._code = value;
	}
	
	private _message: string;
	
	get message(): string {
		return this._message;
	}
	
	set message(value: string) {
		this._message = value;
	}
	
	private _data: T;
	
	get data(): T {
		return this._data;
	}
	
	set data(value: T) {
		this._data = value;
	}
}