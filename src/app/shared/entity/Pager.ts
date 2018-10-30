export class Pager<T> {
	private _currentPage: number;
	private _noOfRowInPage: number;
	private _totalRow: number;
	private _totalPage: number;
	private _results: T[];
	
	
	get currentPage(): number {
		return this._currentPage;
	}
	
	set currentPage(value: number) {
		this._currentPage = value;
	}
	
	get noOfRowInPage(): number {
		return this._noOfRowInPage;
	}
	
	set noOfRowInPage(value: number) {
		this._noOfRowInPage = value;
	}
	
	get totalRow(): number {
		return this._totalRow;
	}
	
	set totalRow(value: number) {
		this._totalRow = value;
	}
	
	get totalPage(): number {
		return this._totalPage;
	}
	
	set totalPage(value: number) {
		this._totalPage = value;
	}
	
	get results(): T[] {
		return this._results;
	}
	
	set results(value: T[]) {
		this._results = value;
	}
}