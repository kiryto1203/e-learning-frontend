import {Component} from '@angular/core';
import {CommonInfo} from "../shared/data/common-info";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'elearning';
	
	constructor() {
		CommonInfo.initialize();
	}
}
