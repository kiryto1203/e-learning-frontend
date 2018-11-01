import {SystemResultId} from "./system-result-id";
import {QuestionBank} from "./question-bank";
import {AnswerBank} from "./answer-bank";

export class SystemResult {
	private systemResultId: SystemResultId;
	private questionBank: QuestionBank;
	private answerBank: AnswerBank;
	private systemResultPosition: number;
	private systemResultIsCorrect: number;
	private creationDate: number;
	private lastUpdateDate: number;
	private lastUpdaterUsername: string;
}