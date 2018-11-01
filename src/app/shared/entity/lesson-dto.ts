import {User} from "./user";
import {LessonReportDto} from "./lesson-report-dto";
import {LessonReportDtoFinish} from "./lesson-report-dto-finish";

export class LessonDto {
	private _lessonCode: string;
	private _userDto: User;
	private _creationDate: number;
	private _lastUpdateDate: number;
	private _isFinish: number;
	private _mappedLessonReports: LessonReportDto[];
	private _mappedLessonReportsFinish: LessonReportDtoFinish[];
	private _totalPercent: number;
	
	
	get lessonCode(): string {
		return this._lessonCode;
	}
	
	set lessonCode(value: string) {
		this._lessonCode = value;
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
	
	get mappedLessonReports(): LessonReportDto[] {
		return this._mappedLessonReports;
	}
	
	set mappedLessonReports(value: LessonReportDto[]) {
		this._mappedLessonReports = value;
	}
	
	get mappedLessonReportsFinish(): LessonReportDtoFinish[] {
		return this._mappedLessonReportsFinish;
	}
	
	set mappedLessonReportsFinish(value: LessonReportDtoFinish[]) {
		this._mappedLessonReportsFinish = value;
	}
	
	get totalPercent(): number {
		return this._totalPercent;
	}
	
	set totalPercent(value: number) {
		this._totalPercent = value;
	}
}