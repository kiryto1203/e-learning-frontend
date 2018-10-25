import {Common} from './common';


export class Api {
	static GET_LESSON = `${Common.HOST}/questions`;
	static REGISTER = `${Common.HOST}/signup`;
	static LOGIN = `${Common.HOST}/login`;
	static VERIFY = `${Common.HOST}/verify`;
}
