import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNavigateComponent } from './test-navigate.component';

describe('TestNavigateComponent', () => {
  let component: TestNavigateComponent;
  let fixture: ComponentFixture<TestNavigateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
