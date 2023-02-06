import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateQuestionsComponent } from './hr-associate-questions.component';

describe('HrAssociateQuestionsComponent', () => {
  let component: HrAssociateQuestionsComponent;
  let fixture: ComponentFixture<HrAssociateQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
