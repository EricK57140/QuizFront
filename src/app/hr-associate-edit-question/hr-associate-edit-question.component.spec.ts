import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateEditQuestionComponent } from './hr-associate-edit-question.component';

describe('HrAssociateEditQuestionComponent', () => {
  let component: HrAssociateEditQuestionComponent;
  let fixture: ComponentFixture<HrAssociateEditQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateEditQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateEditQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
