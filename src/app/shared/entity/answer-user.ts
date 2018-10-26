export class AnswerUser {
	questionCode: string;
	answer: any;
	
	constructor(questionCode: string, answer: any) {
		this.questionCode = questionCode;
		this.answer = answer;
	}
}
