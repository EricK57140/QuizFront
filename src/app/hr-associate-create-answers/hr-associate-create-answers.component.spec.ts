import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociateCreateAnswersComponent } from './hr-associate-create-answers.component';

describe('HrAssociateCreateAnswersComponent', () => {
  let component: HrAssociateCreateAnswersComponent;
  let fixture: ComponentFixture<HrAssociateCreateAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrAssociateCreateAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrAssociateCreateAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
