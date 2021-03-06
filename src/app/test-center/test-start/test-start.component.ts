import {Component, OnInit} from '@angular/core';
import {BaseLayoutComponent} from "../../layout/base-layout-component";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifierService} from "angular-notifier";
import {Category} from "../../shared/entity/category";
import {Pager} from "../../shared/entity/Pager";
import {Result} from "../../shared/entity/result";
import {NoticeType} from "../../shared/utility/NoticeType";
import {CommonInfo, CommonInfoJSON} from "../../shared/data/common-info";

@Component({
	selector: 'app-test-start',
	templateUrl: './test-start.component.html',
	styleUrls: ['./test-start.component.css']
})
export class TestStartComponent extends BaseLayoutComponent{
	categories: Category[];
	categoryCode: string = "";
	subCategory: string = "";
	constructor(router: Router, notifier: NotifierService,
	            private route: ActivatedRoute) {
		super(router, notifier);
		this.setPageTitle("Welcome to examination.","Start Test", false);
	}
	
	ngOnInit() {
		this.getCategories();
	}
	
	getCategories(): void {
		this.route.data.subscribe((data: { categories: Result<Pager<Category>> }) => {
			this.categories = data.categories.data.results;
		});
	}
	
	getCategory(): Category {
		return this.categories.find(w => w.categoryCode === this.categoryCode) || new Category();
	}
	
	handleStartExamination(): void {
		console.log(this.subCategory);
		if(!this.subCategory) this.notifier.notify(NoticeType.DANGER_ALERT,"You must choose subcategory for start examination!");
		else {
			const subCate = this.subCategory.split("@");
			CommonInfo.CATEGORY.categoryCode = this.categoryCode;
			CommonInfo.CATEGORY.subCategoryName = subCate[1];
			CommonInfoJSON.saveDataToLocalStorage();
			this.router.navigate([`/test-center/examination/${subCate[0]}`]);
		}
	}
}
