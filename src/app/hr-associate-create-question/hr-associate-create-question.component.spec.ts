import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateCreateQuestionComponent } from './hr-associate-create-question.component';

describe('HrAssociateCreateQuestionComponent', () => {
  let component: HrAssociateCreateQuestionComponent;
  let fixture: ComponentFixture<HrAssociateCreateQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateCreateQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateCreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
