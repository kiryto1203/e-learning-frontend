import {PageTitle} from "../entity/page-title";
import {LocalstorageKey} from "../utility/localstorage-key";

export class CommonInfo {
	
	static initialize() {
		let localData: string = localStorage.getItem(LocalstorageKey.COMMON_INFO);
		if(localData) {
			let commonInfoJson: CommonInfoJSON = Object.assign(new CommonInfoJSON(),JSON.parse(localData));
			this.IS_LOGIN = commonInfoJson.isLogin;
			this.TOKEN = commonInfoJson.token;
		}
	}
	
	static PAGE_TITLE: PageTitle = new PageTitle('Welcome to E-learning', 'Page', '/bg-parallax1.jpg');
	static IS_LOGIN = false;
	static TOKEN = "";
	
	constructor() {
	}
}

export class CommonInfoJSON {
	private _isLogin: boolean;
	private _token: string;
	
	
	get isLogin(): boolean {
		return this._isLogin;
	}
	
	set isLogin(value: boolean) {
		this._isLogin = value;
	}
	
	get token(): string {
		return this._token;
	}
	
	set token(value: string) {
		this._token = value;
	}
}