import {LessonReportId} from "./lesson-report-id";
import {AnswerDto} from "./answer-dto";

export class LessonReportDtoFinish {
	private _lessionReportId: LessonReportId;
	private _questionContent: string;
	private _questionType: number;
	private _questionParentCode: string;
	private _subcategoryCode: string;
	private _questionPoint: number;
	private _userAnswers: AnswerDto;
	private _userPoint: number;
	private _correctAnswers: AnswerDto[];
	private _incorrectAnswers: AnswerDto[];
	
	
	get lessionReportId(): LessonReportId {
		return this._lessionReportId;
	}
	
	set lessionReportId(value: LessonReportId) {
		this._lessionReportId = value;
	}
	
	get questionContent(): string {
		return this._questionContent;
	}
	
	set questionContent(value: string) {
		this._questionContent = value;
	}
	
	get questionType(): number {
		return this._questionType;
	}
	
	set questionType(value: number) {
		this._questionType = value;
	}
	
	get questionParentCode(): string {
		return this._questionParentCode;
	}
	
	set questionParentCode(value: string) {
		this._questionParentCode = value;
	}
	
	get subcategoryCode(): string {
		return this._subcategoryCode;
	}
	
	set subcategoryCode(value: string) {
		this._subcategoryCode = value;
	}
	
	get questionPoint(): number {
		return this._questionPoint;
	}
	
	set questionPoint(value: number) {
		this._questionPoint = value;
	}
	
	get userAnswers(): AnswerDto {
		return this._userAnswers;
	}
	
	set userAnswers(value: AnswerDto) {
		this._userAnswers = value;
	}
	
	get userPoint(): number {
		return this._userPoint;
	}
	
	set userPoint(value: number) {
		this._userPoint = value;
	}
	
	get correctAnswers(): AnswerDto[] {
		return this._correctAnswers;
	}
	
	set correctAnswers(value: AnswerDto[]) {
		this._correctAnswers = value;
	}
	
	get incorrectAnswers(): AnswerDto[] {
		return this._incorrectAnswers;
	}
	
	set incorrectAnswers(value: AnswerDto[]) {
		this._incorrectAnswers = value;
	}
}