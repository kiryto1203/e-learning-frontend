import {AnswerBankDto} from "./answer-bank-dto";
import {SystemResultDto} from "./system-result-dto";

export class AnswerDto {
	private _answerBankDto: AnswerBankDto;
	private _systemResultDto: SystemResultDto;
	
	
	get answerBankDto(): AnswerBankDto {
		return this._answerBankDto;
	}
	
	set answerBankDto(value: AnswerBankDto) {
		this._answerBankDto = value;
	}
	
	get systemResultDto(): SystemResultDto {
		return this._systemResultDto;
	}
	
	set systemResultDto(value: SystemResultDto) {
		this._systemResultDto = value;
	}
}