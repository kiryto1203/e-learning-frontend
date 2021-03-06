import {Common} from './common';


export class Api {
	static GET_LESSON = `${Common.HOST}/lessions`;
	static REGISTER = `${Common.HOST}/signup`;
	static LOGIN = `${Common.HOST}/login`;
	static VERIFY = `${Common.HOST}/verify`;
	static GET_QUESTION = `${Common.HOST}/categories`;
	static GET_CURRENT_USER = `${Common.HOST}/user/current`;
}
