import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../entity/questions';
import {TestStartComponent} from '../test-start/test-start.component';
import {RouterModule} from '@angular/router';
import {LogService} from '../../service/log/log.service';

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
