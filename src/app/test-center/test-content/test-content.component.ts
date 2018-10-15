import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../shared/entity/questions';
import {RouterModule} from '@angular/router';
import {LogService} from '../../log.service';

@Component({
  selector: 'app-test-content',
  templateUrl: './test-content.component.html',
  styleUrls: ['./test-content.component.css']
})
export class TestContentComponent implements OnInit{
  @Input() questionCurrent: Question;
  @Input() questionParent: string;
  @Input() order: number;
  constructor(private route: RouterModule,
              private logService: LogService) { }

  ngOnInit() {
  }

}
