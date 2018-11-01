import {User} from "./user";
import {LessonReportDto} from "./lesson-report-dto";
import {LessonReportDtoFinish} from "./lesson-report-dto-finish";

export class LessonDto {
	private _lessionCode: string;
	private _userDto: User;
	private _creationDate: number;
	private _lastUpdateDate: number;
	private _isFinish: number;
	private _mappedLessionReports: LessonReportDto[];
	private _mappedLessionReportsFinish: LessonReportDtoFinish[];
	private _totalPercent: number;
	
	
	get lessionCode(): string {
		return this._lessionCode;
	}
	
	set lessionCode(value: string) {
		this._lessionCode = value;
	}
	
	get userDto(): User {
		return this._userDto;
	}
	
	set userDto(value: User) {
		this._userDto = value;
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
	
	get isFinish(): number {
		return this._isFinish;
	}
	
	set isFinish(value: number) {
		this._isFinish = value;
	}
	
	get mappedLessionReports(): LessonReportDto[] {
		return this._mappedLessionReports;
	}
	
	set mappedLessionReports(value: LessonReportDto[]) {
		this._mappedLessionReports = value;
	}
	
	get mappedLessionReportsFinish(): LessonReportDtoFinish[] {
		return this._mappedLessionReportsFinish;
	}
	
	set mappedLessionReportsFinish(value: LessonReportDtoFinish[]) {
		this._mappedLessionReportsFinish = value;
	}
	
	get totalPercent(): number {
		return this._totalPercent;
	}
	
	set totalPercent(value: number) {
		this._totalPercent = value;
	}
}