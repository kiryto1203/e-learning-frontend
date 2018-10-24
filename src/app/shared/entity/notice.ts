export class Notice {
	private _type;
	private _message;
	
	get type() {
		return this._type;
	}
	
	set type(value) {
		this._type = value;
	}
	
	get message() {
		return this._message;
	}
	
	set message(value) {
		this._message = value;
	}
	
	static getInstanceOf(_type, _message) {
		return new Notice(_type,_message);
	}
	
	private constructor(type, message) {
		this._type = type;
		this._message = message;
	}
}