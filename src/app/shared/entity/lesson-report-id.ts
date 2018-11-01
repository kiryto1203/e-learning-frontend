export class LessonReportId {
	private _lessionReportLessionCode: string;
	private _lessionReportQuestionCode: string;
	
	
	get lessionReportLessionCode(): string {
		return this._lessionReportLessionCode;
	}
	
	set lessionReportLessionCode(value: string) {
		this._lessionReportLessionCode = value;
	}
	
	get lessionReportQuestionCode(): string {
		return this._lessionReportQuestionCode;
	}
	
	set lessionReportQuestionCode(value: string) {
		this._lessionReportQuestionCode = value;
	}
}