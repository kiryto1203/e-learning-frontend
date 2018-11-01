import {SystemResultId} from "./system-result-id";
import {QuestionBank} from "./question-bank";
import {AnswerBank} from "./answer-bank";

export class SystemResultDto {
	private _systemResultId: SystemResultId;
	private _questionBank: QuestionBank;
	private _answerBank: AnswerBank;
	private _systemResultPosition: number;
	private _systemResultIsCorrect: number;
	private _creationDate: number;
	private _lastUpdateDate: number;
	private _lastUpdaterUsername: string;
	
	
	get systemResultId(): SystemResultId {
		return this._systemResultId;
	}
	
	set systemResultId(value: SystemResultId) {
		this._systemResultId = value;
	}
	
	get questionBank(): QuestionBank {
		return this._questionBank;
	}
	
	set questionBank(value: QuestionBank) {
		this._questionBank = value;
	}
	
	get answerBank(): AnswerBank {
		return this._answerBank;
	}
	
	set answerBank(value: AnswerBank) {
		this._answerBank = value;
	}
	
	get systemResultPosition(): number {
		return this._systemResultPosition;
	}
	
	set systemResultPosition(value: number) {
		this._systemResultPosition = value;
	}
	
	get systemResultIsCorrect(): number {
		return this._systemResultIsCorrect;
	}
	
	set systemResultIsCorrect(value: number) {
		this._systemResultIsCorrect = value;
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
	
	get lastUpdaterUsername(): string {
		return this._lastUpdaterUsername;
	}
	
	set lastUpdaterUsername(value: string) {
		this._lastUpdaterUsername = value;
	}
}