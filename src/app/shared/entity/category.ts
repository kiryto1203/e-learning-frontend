export class Category {
	get categoryCode(): string {
		return this._categoryCode;
	}
	
	set categoryCode(value: string) {
		this._categoryCode = value;
	}
	
	get categoryIntro(): string {
		return this._categoryIntro;
	}
	
	set categoryIntro(value: string) {
		this._categoryIntro = value;
	}
	
	get subcategoriesName(): string[] {
		return this._subcategoriesName;
	}
	
	set subcategoriesName(value: string[]) {
		this._subcategoriesName = value;
	}
	
	get subcategoriesCode(): string[] {
		return this._subcategoriesCode;
	}
	
	set subcategoriesCode(value: string[]) {
		this._subcategoriesCode = value;
	}
	
	get subcategoriesCount(): number {
		return this._subcategoriesCount;
	}
	
	set subcategoriesCount(value: number) {
		this._subcategoriesCount = value;
	}
	
	get creationDate(): number {
		return this._creationDate;
	}
	
	set creationDate(value: number) {
		this._creationDate = value;
	}
	
	get lastUpdateDate(): number {
		return this._lastUpdateDate;
	}
	
	set lastUpdateDate(value: number) {
		this._lastUpdateDate = value;
	}
	private _categoryCode: string;
	private _categoryIntro: string;
	private _subcategoriesName: string[];
	private _subcategoriesCode: string[];
	private _subcategoriesCount: number;
	private _creationDate: number;
	private _lastUpdateDate: number
	
	;
}