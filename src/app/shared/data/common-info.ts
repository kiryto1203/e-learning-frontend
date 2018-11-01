import {PageTitle} from "../entity/page-title";
import {User} from "../entity/user";
import {LocalstorageKey} from "../utility/localstorage-key";

/**
 * Class static save global variable. Call initialize every refresh page to get data from LocalStorage to this class and avoid miss data.
 * Some data relate token or user when missing when expired.
 */
export class CommonInfo {
	
	static initialize() {
		let localData: string = localStorage.getItem(LocalstorageKey.COMMON_INFO);
		if(!localData) return;
		let commonInfoJson: CommonInfoJSON = Object.assign(new CommonInfoJSON(),JSON.parse(localData));
		if(!this.isExpired(commonInfoJson.timeExpired)) return;
		this.IS_LOGIN = commonInfoJson.isLogin;
		this.TOKEN = commonInfoJson.token;
		this.CURRENT_USER = commonInfoJson.currentUser;
		this.TIME_EXPIRED = commonInfoJson.timeExpired;
		console.log(commonInfoJson.category);
		this.CATEGORY = commonInfoJson.category;
	}
	
	static PAGE_TITLE: PageTitle = new PageTitle('Welcome to E-learning', 'Page', '/bg-parallax1.jpg');
	static CATEGORY: { categoryCode: string, subCategoryName: string } = {
		categoryCode: "",
		subCategoryName: "",
	};
	static IS_LOGIN = false;
	static TOKEN = "";
	static CURRENT_USER: User = new User();
	static TIME_EXPIRED = (new Date()).getTime();
	
	constructor() {
	}
	
	private static isExpired(timeExpire: number = 0): boolean {
		return (new Date()).getTime() - timeExpire >= 0;
	}
}

/**
 * Create object json for saving data from CommonInfo to LocalStorage. Call saveDataToLocalStorage() function
 * every time CommonInfo change value to save this change to LocalStorage.
 */
export class CommonInfoJSON {
	private _isLogin: boolean;
	private _token: string;
	private _currentUser: User;
	private _timeExpired: number;
	private _category: { categoryCode: string, subCategoryName: string };
	
	get category(): { categoryCode: string; subCategoryName: string } {
		return this._category;
	}
	
	set category(value: { categoryCode: string; subCategoryName: string }) {
		this._category = value;
	}
	
	static saveDataToLocalStorage() {
		let commonInfoJson = new CommonInfoJSON();
		commonInfoJson.token = CommonInfo.TOKEN;
		commonInfoJson.isLogin = CommonInfo.IS_LOGIN;
		commonInfoJson.timeExpired = CommonInfo.TIME_EXPIRED;
		commonInfoJson.currentUser = CommonInfo.CURRENT_USER;
		commonInfoJson.category = CommonInfo.CATEGORY;
		localStorage.setItem(LocalstorageKey.COMMON_INFO,JSON.stringify(commonInfoJson));
	}
	
	get currentUser(): User {
		return this._currentUser;
	}
	
	set currentUser(value: User) {
		this._currentUser = value;
	}
	
	get timeExpired(): number {
		return this._timeExpired;
	}
	
	set timeExpired(value: number) {
		this._timeExpired = value;
	}
	
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