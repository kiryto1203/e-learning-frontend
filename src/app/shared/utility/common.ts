export class Common {
	static HOST = 'http://localhost:9000/api/v1';
	static START_ASCII_NUMBER = 65;
	
	static REGEXP_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	static REGEXP_PHONE = /^[0]{1}[1,9]{1}[0-9]{8,9}$/;
	static DEFAULT_RANDOM_CHARACTER_LENGTH = 20;
	static TIME_EXIST_OF_TOKEN = 36000;
	
	static Q_TYPE_CHOOSE_ONE = 1;
	static Q_TYPE_CHOOSE_MULTIPLE = 2;
	static Q_TYPE_PARAGRAPH = 3;
	static Q_TYPE_ENTER = 4;
	
	static getStringUpperCaseFromIndex(index: number): string {
		return String.fromCharCode(index + Common.START_ASCII_NUMBER);
	}
	
	
}
