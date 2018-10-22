import {Component, Input, OnInit} from '@angular/core';
import {PageTitle} from "../../shared/entity/page-title";
import {CommonInfo} from "../../shared/data/common-info";

@Component({
  selector: 'app-layout-page-title',
  templateUrl: './layout-page-title.component.html',
  styleUrls: ['./layout-page-title.component.css']
})
export class LayoutPageTitleComponent implements OnInit {
  pageTitle: PageTitle;
  constructor() {
    this.pageTitle = CommonInfo.PAGE_TITLE;
  }

  ngOnInit() {
  }

}
