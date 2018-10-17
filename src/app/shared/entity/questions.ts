import {Answer} from './answer';

export class Question {
	question_code: string;
	content: string;
	type: number;
	parent: string;
	answers: Answer[];
}
