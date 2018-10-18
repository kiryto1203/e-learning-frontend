export class Common {
	static HOST = 'http://localhost:8080';
	static START_ASCII_NUMBER = 65;
	
	static Q_TYPE_CHOOSE_ONE = 1;
	static Q_TYPE_CHOOSE_MULTIPLE = 2;
	static Q_TYPE_PARAGRAPH = 3;
	static Q_TYPE_ENTER = 4;
	
	static getStringUpperCaseFromIndex(index: number): string {
		return String.fromCharCode(index + Common.START_ASCII_NUMBER);
	}
}
