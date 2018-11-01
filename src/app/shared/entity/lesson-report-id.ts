export class LessonReportId {
	private _lessonReportLessonCode: string;
	private _lessonReportQuestionCode: string;
	
	
	get lessonReportLessonCode(): string {
		return this._lessonReportLessonCode;
	}
	
	set lessonReportLessonCode(value: string) {
		this._lessonReportLessonCode = value;
	}
	
	get lessonReportQuestionCode(): string {
		return this._lessonReportQuestionCode;
	}
	
	set lessonReportQuestionCode(value: string) {
		this._lessonReportQuestionCode = value;
	}
}