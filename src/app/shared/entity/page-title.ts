export class PageTitle {
	private _title: string;
	private _pageName: string;
	private _imageLink: string;
	
	
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
	
	
	constructor(title: string, pageName: string, imageLink: string) {
		this._title = title;
		this._pageName = pageName;
		this._imageLink = imageLink;
	}
}
