import {AnswerDto} from "./answer-dto";

export class AnswerUser {
	questionCode: string;
	answerDto: AnswerDto[];
	
	constructor(questionCode: string, answerDto: AnswerDto[]) {
		this.questionCode = questionCode;
		this.answerDto = answerDto;
	}
}
