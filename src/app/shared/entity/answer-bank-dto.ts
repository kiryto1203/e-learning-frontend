export class AnswerBankDto {
	private _answerCode: string;
	private _answerContent: string;
	private _creationDate: number;
	private _lastUpdateDate: number;
	private _creatorUsername: string;
	private _lastUpdaterUsername: string;
	
	
	get answerCode(): string {
		return this._answerCode;
	}
	
	set answerCode(value: string) {
		this._answerCode = value;
	}
	
	get answerContent(): string {
		return this._answerContent;
	}
	
	set answerContent(value: string) {
		this._answerContent = value;
	}
	
	get creationDate(): number {
		return this._creationDate;
	}
	
	set creationDate(value: number) {
		this._creationDate = value;
	}
	
	get lastUpdateDate(): number {
		return this._lastUpdateDate;
	}
	
	set lastUpdateDate(value: number) {
		this._lastUpdateDate = value;
	}
	
	get creatorUsername(): string {
		return this._creatorUsername;
	}
	
	set creatorUsername(value: string) {
		this._creatorUsername = value;
	}
	
	get lastUpdaterUsername(): string {
		return this._lastUpdaterUsername;
	}
	
	set lastUpdaterUsername(value: string) {
		this._lastUpdaterUsername = value;
	}
}