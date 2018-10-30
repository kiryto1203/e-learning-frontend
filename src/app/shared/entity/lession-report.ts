import {LessionReportId} from "./lession-report-id";

export class LessionReport {
	private lessionReportId: LessionReportId;
	private questionContent: string;
	private questionType: number;
	private questionParentCode: string;
	private subcategoryCode: string;
	private questionPoint: number;
	private List<AnswerDto> answers;
	private List<AnswerDto> userAnswers;
	@JsonIgnore
	private LessionDto mappedLessionDto;
	private Double userPoint;
	
	@JsonIgnore
	private List<AnswerDto> correctAnswers;
	@JsonIgnore
	private List<AnswerDto> incorrectAnswers;
	
	@Override
	public int compareTo(LessionReportDto o) {
	return this.getLessionReportId().getLessionReportQuestionCode().compareTo(o.getLessionReportId().getLessionReportQuestionCode());
}
}