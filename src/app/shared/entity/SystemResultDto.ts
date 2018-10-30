import {SystemResultId} from "./system-result-id";

export class SystemResultDto {
	private  systemResultId: SystemResultId;
	private questionBank: QuestionBank;
	private answerBank: AnswerBank;
	private systemResultPosition: number;
	private systemResultIsCorrect: number;
	private creationDate: number;
	private lastUpdateDate: number;
	private lastUpdaterUsername: string;
}