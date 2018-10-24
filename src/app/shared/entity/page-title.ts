export class PageTitle {
	private _title: string;
	private _pageName: string;
	private _imageLink: string;
	private _isShow: boolean;
	
	
	get isShow(): boolean {
		return this._isShow;
	}
	
	set isShow(value: boolean) {
		this._isShow = value;
	}
	
	get title(): string {
		return this._title;
	}
	
	set title(value: string) {
		this._title = value;
	}
	
	get pageName(): string {
		return this._pageName;
	}
	
	set pageName(value: string) {
		this._pageName = value;
	}
	
	get imageLink(): string {
		return this._imageLink;
	}
	
	set imageLink(value: string) {
		this._imageLink = value;
	}
	
	
	constructor(title: string, pageName: string, imageLink: string, isShow: boolean = true) {
		this._title = title;
		this._pageName = pageName;
		this._imageLink = imageLink;
		this._isShow = isShow;
	}
}
